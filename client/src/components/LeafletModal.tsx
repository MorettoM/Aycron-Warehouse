import {  Modal } from 'antd';
import { MapContainer , Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { LatLngLiteral } from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from 'leaflet';

function LocationMarker({ center, name }: { center: LatLngLiteral, name: string}) {

  const map = useMap()
  map.invalidateSize();
  return (
  <Marker icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} position={center}>
      <Popup>{name}</Popup>
  </Marker>
  )
}

function Routing({ lngLat1, lngLat2} : { lngLat1: LatLngLiteral, lngLat2: LatLngLiteral }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    var greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    const routingControl = (L as any).Routing.control({
      waypoints: [L.latLng(lngLat1.lat, lngLat1.lng), L.latLng(lngLat2.lat, lngLat2.lng)],
      routeWhileDragging: true,
      createMarker: (i: any, wp: any, nWps: any) => {
        
        if (i === 1) {return L.marker(wp.latLng, {
        icon: greenIcon
      })}
    return null;
    }
    }).addTo(map);

    return () => {map.removeControl(routingControl)};
  }, [map, lngLat1, lngLat2]);

  return null;
}

function timeFormat(duration: number) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
}

const LeafletModal = (
  { open, onClose, nearest, addressLngLat } : 
  { open: boolean; onClose: () => void; nearest: any[] | null, addressLngLat: LatLngLiteral | null}) => {


  return (
    <Modal
        width={1000}
        okText="Create"
        className='leaflet-modal'
        open={open}
        footer={null}
        destroyOnClose
        onCancel={() => onClose()}
      >
		  <div id="map" style={{height: "800px"}}>
      <MapContainer
          center={addressLngLat as LatLngLiteral} zoom={15}>
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            nearest?.map(item => <LocationMarker name={item.warehouse.name} 
              center={{
              lng: item.warehouse.lngLat.split(',')[0],
              lat: item.warehouse.lngLat.split(',')[1]
            }} />)
          }
        {nearest && addressLngLat &&  <Routing 
          lngLat2={addressLngLat}
          lngLat1={{
              lng: nearest[0].warehouse.lngLat.split(',')[0],
              lat: nearest[0].warehouse.lngLat.split(',')[1]
          }}/>}
      </MapContainer>
	  </div>
    <div className="nearest-box">
      {
        nearest?.map((item, idx) => <div>
        {idx + 1} - {item.warehouse.name} - {timeFormat(item.duration)}
        </div>)
      }
    </div>
    </Modal>
  );
};

export default LeafletModal;