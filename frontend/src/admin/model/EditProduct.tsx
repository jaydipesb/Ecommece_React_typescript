import { Button, Form, Input, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";




const EditProduct = ({ editModel, setEditModel, editData }: {
  editModel: boolean; setEditModel: (flage: boolean) => void; editData: {
    EditProduct: { id: string, title: string, price: number, description: string, category: string, image: string }
  }
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState("");

  const id = editData?.EditProduct?.id;
  const [form] = Form.useForm();

  form.setFieldsValue({
    title: editData?.EditProduct?.title,
    price: editData?.EditProduct?.price,
    description: editData?.EditProduct?.description,
    category: editData?.EditProduct?.category,
    image: editData?.EditProduct?.image,
  });

  interface Info {
    [key: string]: any
  }

  const handleChange = (info: Info) => {
    console.log("info", info);
    setState(info.file);
  };
  const handleCancel = () => {
    setEditModel(false);
  };

  const onFinish = async (values: { category: string, description: string, image: string, price: string, title: string }) => {
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("title", values.title);
      formData.append("image", state);
      console.log(formData);
      const updateProducts = await axios.put(
        "http://localhost:3000/api/updateProduct",
        formData,
      );
      console.log("updateProducts", updateProducts.data.status);
      if (updateProducts.data.status == true) {
        setEditModel(false);
        message.success("product updated successfully");
      }
    } catch (error) {
      message.error("something went wrong");
    }
  };

  return (
    <>
      <Modal
        title="Edit user"
        width={1000}
        visible={editModel}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
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
                required: true,
                pattern: new RegExp(/^[0-9.]+$/i),
                message: "Please enter your price!",
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
                required: false,
                message: 'input Image',
              },
            ]}
          >
            <Upload
              beforeUpload={() => {
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

export default EditProduct;
