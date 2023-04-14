import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Table from "react-bootstrap/Table";
import swal from "sweetalert";

function Home() {
  const [data, setData] = useState([]);



  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deletecontact = (id) => {
    if (window.confirm("are you sure you want to delete this contact?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("contact deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  const editcontact = (id) => {
    axios.get(`http://localhost:5000/api/get/${id}`);
  };

  const changeStatus = (id) => {
    swal({
      title: "Are you sure?",
      text: "Your status will be changed!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.put(`http://localhost:5000/api/updatestatus/${id}`);

        swal("status changed successfully", {
          icon: "success",
        });
        loadData();
      } else {
        swal("Your status does not changed!");
      }
    });
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  //filter
  const handleFilter = async (value) => {
    return await axios
      .get(`http://localhost:5000/api/data/${value}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        // loadData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/addcontact">
        <button className="btn btn-primary">Add Contact</button>
      </Link>

      <div>
        <h4>Filter</h4>
        <button
          className="btn btn-primary"
          onClick={() => handleFilter("Active")}
        >
          Active
        </button>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "2px" }}
          onClick={() => handleFilter("Inactive")}
        >
          Inactive
        </button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, index) => {
            return (
              <tr key={item.id}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => changeStatus(item.id)}
                  >
                    {item.status}
                  </button>
                </td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button
                      className="btn btn-primary"
                      onClick={() => editcontact(item.id)}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deletecontact(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-success">View</button>
                  </Link>
                </td>
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

          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a href="#" className="page-link" onClick={() => changeCPage(n)}>
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
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default Home;
