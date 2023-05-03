import { Request, Response } from "express";

import sanitize from "mongo-sanitize";
import LoggerService from "@services/logger.service";
import WarehouseService from "@services/warehouse.service";
import { validateWarehouse } from "@validations/warehouse.validation";
import fetch from 'node-fetch';
import { WarehouseDocument } from "@models/warehouse.model";
const Openrouteservice = require('openrouteservice-js');
globalThis.fetch = fetch as any;

const OPENROUTESERVICE_API_KEY = '5b3ce3597851110001cf624844ae8cbf86f24fbaab2144e6829816da';

export const getWarehouses = async (req: Request, res: Response) => {
  const warehouses = await WarehouseService.getWarehouses();
  
  return res.status(200).send({ warehouses });
};

export const getNearestWarehouses = async (req: Request, res: Response) => {
  const warehouses = await WarehouseService.getWarehouses();

  const address = req.query.address;

  const xAddress = await getAddressLocation(address?.toString() ?? '');

  const nearest = await findNearestWarehouse(xAddress, warehouses);

  return res.status(200).send({ nearest, addressLngLat: xAddress });
};


export const deleteWarehouse = async (req: Request, res: Response) => {
  await WarehouseService.deleteWarehouseById(req.params.id);

  const warehouses = await WarehouseService.getWarehouses();

  return res.status(200).send({ warehouses });
};

async function getAddressLocation(address: string) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;
  const response = await fetch(url);
  const data: any = await response.json();

  if (data.length === 0) {
    throw new Error("Unable to find location for address");
  }
  const location = data[0];
  const longitude = location.lon;
  const latitude = location.lat;
  return {
    lng: longitude as string,
    lat: latitude as string,
  };
}


export const postWarehouse = async (req: Request, res: Response) => {
  // Validate Warehouse input
  const { error } = validateWarehouse(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let sanitizedInput = sanitize<{ name: string; code: string; address: string; state: string; county?: string; zip?: string; lngLat: string; productsFile: string;}>(req.body);

  try {
    let warehouse = await WarehouseService.findWarehouseByCode(sanitizedInput.code);
    if (warehouse) {
      return res.status(400).send({ message: "Warehouse with that code already exists." });
    }


    const address = `${sanitizedInput.address}, ${sanitizedInput.state}`
    let lngLat = {
      lng: "",
      lat: ""
    }
    try {
      lngLat = await getAddressLocation(address)
    } catch (error) {
      console.error(error);
    }

    const newWH = WarehouseService.createWarehouse({...sanitizedInput, lngLat: `${lngLat.lng},${lngLat.lat}` });
    try {
      await WarehouseService.saveWarehouse(newWH);
      const warehouses = await WarehouseService.getWarehouses();
      return res.status(200).send({ message: "A new Warehouse has been created", warehouses });
    } catch (error) {
      LoggerService.log.error(error);

      return res.status(500).send({ message: "Creation of Warehouse failed, try again." });
    }
  } catch (error) {
    LoggerService.log.error(error);

    return res.status(500).send("An unexpected error occurred");
  }
};


async function findNearestWarehouse(address: { lng: string; lat: string; }, warehouses: WarehouseDocument[]) {
  const batches = chunkArray(warehouses, 50);
  let newWarehouses: any = [];

  for (const batch of batches) {
    const locations = [
      [
        address.lng, address.lat
      ],
      ...batch.map((warehouse: WarehouseDocument) => warehouse.lngLat.split(','))];

    const Matrix = new Openrouteservice.Matrix({ api_key: OPENROUTESERVICE_API_KEY})

    try {
      const results = await Matrix.calculate({
      locations,
      profile: "driving-car",
      sources: Array.from({length: batch.length}, (_, i) => i + 1),
      destinations: [0]
    })

    const { sources, durations } = results;

    const warehousesDuration = sources
      .map((src: any, idx: number) => {
        return ({
          duration: durations[idx][0],
          warehouse: batch[idx]
        })
      })
  
      newWarehouses.push(...warehousesDuration)
    } catch (error: any) {
      console.log("An error occurred: " + error)
    }
  }


  return newWarehouses.sort((a: any, b: any) => 
        {
          if (a.duration < b.duration) return -1;

          return 1;
        }
      )
      .slice(0, 3)
}

function chunkArray(arr: any, size: number) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}


export default {
  getWarehouses,
  postWarehouse,
  deleteWarehouse,
  getNearestWarehouses
};
