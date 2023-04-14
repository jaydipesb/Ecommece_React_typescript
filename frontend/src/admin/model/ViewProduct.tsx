import React from "react";
import { Modal } from 'antd';



const ViewProduct = ({ viewModel, setViewModel, viewData }: {
  viewModel: boolean; setViewModel: (flage: boolean) => void; viewData: {
    productData: { id: number, title: string, price: number, description: string, category: string, image: string
     } }
}) => {
  const handleOk = () => {
    setViewModel(false);
  }

  const handleCancel = () => {
    setViewModel(false);
  }
  return (
    <div>
      <Modal
        title="Product Details" width={1000} visible={viewModel} onOk={handleOk} onCancel={handleCancel} footer={null}
      >
        <div>
          <span>Category: {viewData?.productData?.category}</span>
          <br />
          <br />
          <span>
            <img
              src={`http://localhost:3000/${viewData?.productData?.image}`}
              alt=""
              width={70}
              height={70}
            />
          </span>
          <br />
          <br />
          <span>Title:{viewData?.productData?.title}</span>
          <br />
          <br />
          <span>Description:{viewData?.productData?.description}</span>
          <br />
          <br />
          <span>
            <b>Price:{viewData?.productData?.price}</b>
          </span>
          <br />
          <br />
        </div>
      </Modal>
    </div>
  );
};

export default ViewProduct;
