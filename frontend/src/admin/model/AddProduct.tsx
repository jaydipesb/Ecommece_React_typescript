import { Button, Form, Input, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import axios from "axios";

const Addproduct = ({ isModalVisible, setIsModalVisible }:{ isModalVisible : boolean; setIsModalVisible: (flage:boolean) => void;}) => {

  const [state, setState] = useState("");

  console.log("state", state);
  
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (info: { file: any; }) => {
    setState(info.file);
  };
 
  const onFinish = async (values:{category:string,description:string,image:string,price:string,title:string}) => {
    const formData = new FormData();
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("title", values.title);
    formData.append("image", state);
    console.log(formData);
    // Display the key/value pairs
// for (var pair of formData.entries()) {
//   console.log(pair[0]+ ', ' + pair[1]); 
// }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/addProduct",
        formData
      );
      console.log(response.data.status);
      if (response.data.status == true) {
        setIsModalVisible(false);
        message.success("product added succesfully");
      } else {
        setIsModalVisible(true);
        message.error("something went wrong");
      }
    } catch (error) {
      message.error("something went wrong");
    }
  };
  return (
    <>
      <Modal
        title="Add Product"
        width={1000}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter your title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                pattern: new RegExp(/^[0-9.]+$/i),
                required: true,
                message: "Please enter valid product price!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter your description!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please enter your category!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "input Image",
              },
            ]}
          >
            <Upload
              beforeUpload={(file) => {
                return false;
              }}
              onChange={handleChange}
              multiple={false}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Addproduct;
