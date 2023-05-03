import { Card, Popconfirm } from "antd";
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
import { Tooltip } from 'antd';
import DefaultImg from '../assets/Warehouse_default.jpg';
import { useAppDispatch } from "src/store/hooks";
import { attemptDelete } from "src/store/thunks/warehouse";
import { Warehouse } from "src/store/actions/warehouse";

export default function WarehosueCard({ warehouse }: { warehouse: Warehouse }) {
	const dispatch = useAppDispatch();
	
	const downloadFile = () => {
		const fileName = `${warehouse.name} - Product List`;
		const json = JSON.stringify({
			productList: []
		}, null, 2);
		const blob = new Blob([json], { type: "application/json" });
		const href = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = warehouse.productsFile ?? href;
		link.download = fileName + ".json";
		document.body.appendChild(link);
		link.click();
	  
		document.body.removeChild(link);
		URL.revokeObjectURL(href);
	}

	return (
		<Card
		key={warehouse.name}
		style={{ width: 300 }}
		cover={
		  <img
			alt="warehouse"
			src={warehouse.image ?? DefaultImg}
			className="warehouse-image"
		  /> 
		}
		actions={[
		<Tooltip title="Delete Warehouse">
			<Popconfirm
			zIndex={99999}
			placement="top"
			title={"Are you sure you want to delete this Warehouse?"}
			onConfirm={() => dispatch(attemptDelete(warehouse._id))}
			okText="Yes"
			cancelText="Cancel"
		  >
		  <DeleteOutlined key="delete" />
		  </Popconfirm>
		  </Tooltip>,
		  <Tooltip title="Download Warehouse product list" >
		  	<DownloadOutlined onClick={downloadFile} key="ellipsis" />
		  </Tooltip>
		]}
	  >
		<Meta
		  title={`${warehouse.name} (${warehouse.code})`}
		  description={
			<p
			title={`${warehouse.address}, ${warehouse.state}`}
			style={{
				textOverflow: "ellipsis",
				overflow: "hidden",
				whiteSpace: "nowrap"
				}}
		  >
			{`${warehouse.address}, ${warehouse.state}`}</p>}
		/>
		<Meta
		  description={`${warehouse.county ?? ''}${warehouse.zip ? ` ${warehouse.zip}` : ''}`}
		/>
	  </Card>
	);
  }
  