import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";

import AddProduct from "../model/AddProduct";
import EditProduct from "../model/EditProduct";
import ViewProduct from "../model/ViewProduct";


interface UserData {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

function Products() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModel, setEditModel] = useState(false);
  const [editData, setEditData] = useState<any>();;
  const [viewModel, setViewModel] = useState(false);
  const [viewData, setViewData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/allProduct");
      setDataSource(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      message.error("something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [editModel,isModalVisible]);


  const deleteProduct = async (item:{id:number}) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/deleteProduct/${item.id}`
      );
      console.log(response);
      fetchProducts();
      message.success("product deleterd successfully");
    } catch (error) {
      message.error("something went wrong");
    }
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = dataSource.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataSource.length / recordPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <>
      <div>
        <button
          style={{
            cursor: "pointer",
            fontSize: "18px",
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: "black",
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
          }}
          onClick={() => {
            setIsModalVisible(!isModalVisible);
          }}
        >
          <PlusOutlined />
          Add Product
        </button>
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Categoty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item:{id:number, title: string, price: number, category:string, image:string}, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="image-id">
                    <img
                      src={`http://localhost:3000/${item?.image}`}
                      alt=""
                      className="Admin-Product-image"
                    />
                    
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <Button
                      style={{ backgroundColor: "black", color: "white" }}
                      icon={<EditOutlined />}
                      onClick={() => {
                        setEditData({ EditProduct: item });
                        setEditModel(!editModel);
                      }}
                    ></Button>
                    {/* &nbsp;&nbsp; */}
                    <Popconfirm
                      placement="top"
                      title="Are you sure you want to delete this user?"
                      onConfirm={() => deleteProduct(item)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        style={{ backgroundColor: "red", color: "white" }}
                        icon={<DeleteOutlined />}
                      ></Button>
                    </Popconfirm>
                    <Button style={{backgroundColor:"black",color:"white"}} icon={<EyeOutlined />}onClick={() => {
                                            setViewData({ productData: item })
                                            setViewModel(!viewModel)
                                        }}></Button>&nbsp;&nbsp;
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <AddProduct
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
        <EditProduct
          editModel={editModel}
          setEditModel={setEditModel}
          editData={editData}
        />
         <ViewProduct viewModel={viewModel} setViewModel={setViewModel} viewData={viewData} />
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>

            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id:number) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}
export default Products;
