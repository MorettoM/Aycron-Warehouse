import { Button, Col, Form, Input, Modal, Row, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { attemptCreate } from 'src/store/thunks/warehouse';

const CreateWarehouseModal = ({ open, setOpen } : { open: boolean; setOpen: (val: boolean) => void;}) => {
  const [image, setImage] = useState<string | null | ArrayBuffer>(null);
  const [file, setFile] = useState<string | null | ArrayBuffer>(null);
  const dispatch = useAppDispatch();

  const readFile = (file: File, type: "image" | "products") => {
    const reader = new FileReader();
    reader.onload = e => {
      if(type === "image") {
        setImage(e.target?.result ?? null)
      } else {
        setFile(e.target?.result ?? null)
      }
    };
    reader.readAsDataURL(file);

    return false;
}

  return (
      <Modal
        title="Create a new Warehouse"
        centered
        width={700}
        okText="Create"
        open={open}
        footer={null}
        destroyOnClose
        onCancel={() => setOpen(false)}
      >
      <Form
        onFinish={(values) => {
          const vals = {...values};
          if (image) {
            vals.image = image;
          }
          if (file) {
            vals.productsFile = file;
          }
          dispatch(attemptCreate(vals)).then(() => setOpen(false))
          
        }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600, marginTop: "40px" }}
      >
        <Row>
        <Col md={12}>
            <Form.Item name="name" required labelCol={{
              md: 6
            }} label="Name">
              <Input required />
          </Form.Item>
        </Col>
        <Col md={12}>
            <Form.Item name="code" required labelCol={{
              md: 6
            }} label="Code">
              <Input required />
          </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col md={12}>
            <Form.Item name="address" required labelCol={{
              md: 6
            }} label="Address">
              <Input required />
          </Form.Item>
        </Col>
        <Col md={12}>
            <Form.Item name="state" required labelCol={{
              md: 6
            }} label="State">
              <Input required />
          </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col md={12}>
            <Form.Item name="county" labelCol={{
              md: 6
            }} label="County">
              <Input  />
          </Form.Item>
        </Col>
        <Col md={12}>
            <Form.Item name="zip" labelCol={{
              md: 6
            }} label="Zip">
              <Input  />
          </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col md={12}>
        <Form.Item name="image" labelCol={{ md: 6 }} label="Image" >
          <Upload onRemove={() => setImage(null)} beforeUpload={file => readFile(file, "image")} maxCount={1} accept='.jpg' listType="picture-card">
              <PlusOutlined />
          </Upload>
        </Form.Item>
        </Col>
        <Col md={12}>
        <Form.Item name="productsFile" wrapperCol={{md: 6}} labelCol={{ md: 5 }} label="Products" >
        <Upload onRemove={() => setFile(null)} beforeUpload={file => readFile(file, "products")} maxCount={1} accept='.json'>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col md={18} />
        <Col md={3}>
        <Button onClick={() => setOpen(false)} type="default" >
        Cancel
      </Button>
      </Col>
      <Col md={3}>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Create
      </Button>
    </Form.Item>
    </Col>
        </Row>
      </Form>
      </Modal>
  );
};

export default CreateWarehouseModal;