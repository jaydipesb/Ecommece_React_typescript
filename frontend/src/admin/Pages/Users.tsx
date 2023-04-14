import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import {message} from "antd";

function Users() {
  const [dataSource, setDataSource] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getAllUsers");
      setDataSource(response.data);
      console.log(response.data);
    } catch (error) {
      message.error("something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



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
        <h1>Users</h1>
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item: { id: number, name: string, email: string}) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
       
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>

            {numbers.map((n:number, i:number) => (
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
export default Users;
