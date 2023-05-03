import WarehosueCard from 'src/components/WarehouseCard';
import {  Button, Card, FloatButton, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import CreateWarehouseModal from 'src/components/CreateWarehouseModal';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { attemptGetNearest, attemptGetWarehosues } from 'src/store/thunks/warehouse';
import LeafletModal from 'src/components/LeafletModal';
import { LatLngLiteral } from 'leaflet';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [finder, setFinder] = useState("");
  const dispatch = useAppDispatch();
  const { warehouses, loading} = useAppSelector((state) => state.warehouse);
  const [nearest, setNearest] = useState<any[] | null>(null)
  const [addressLngLat, setAddressLngLat] = useState<LatLngLiteral | null>(null)
  const user = useAppSelector(state => state.user.user)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(attemptGetWarehosues())
  }, [dispatch])

  const onFind = useCallback(() => {
    setIsLoading(true)
    dispatch(attemptGetNearest(finder)).then(data => {
      setNearest(data.nearest);
      setAddressLngLat(data.addressLngLat as any)
      setMapOpen(true);
      setIsLoading(false)
    })
  }, [finder, dispatch])


  return (
    <div className='container'>
     { user?.isAdmin && <>
      <div className='finder-text'>Find nearest Warehouses to address:</div>
      <div className='finder-container'>
        <Input value={finder} onChange={e => setFinder(e.target.value)} className='finder-input' placeholder='Address 123, New York'/>
        <Button loading={isLoading} onClick={onFind} disabled={!finder} type="primary" className='finder-btn'>Find</Button>
      </div>
      </>}
      <div className='warehouse-grid'>
        {
          loading ?
          [...Array(10)].map(x => <Card
            key={`loading-${x}`}
            style={{ width: 300 }}
            loading
            />) 
          : warehouses?.map((warehouse, idx) => <WarehosueCard key={warehouse.code + idx} warehouse={warehouse} />)
        }
      </div>
      <FloatButton
      onClick={() => setOpen(true)}
      style={{
        width: "80px",
        height: "80px"
      }} tooltip="Add new Warehouse" icon={<PlusOutlined />}
      />
      <CreateWarehouseModal open={open} setOpen={setOpen} />
      <LeafletModal addressLngLat={addressLngLat} nearest={nearest} open={mapOpen} onClose={() => {
        setMapOpen(false)
        setNearest(null);
        setAddressLngLat(null)        
        }} />
    </div>
  );
}
