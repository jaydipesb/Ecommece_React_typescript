import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { Button, Card, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Signup = () => {
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async (values:{name:string, email:string, password:string}) => {
    let name = values.name;
    let email = values.email;
    let password = values.password;
    let result = await fetch("http://localhost:3000/api/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let resultData = await result.json();
    console.log(resultData);
    if (resultData) {
      navigate("/login");
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="register">
        <Card
          bordered={false}
          style={{
            // width: 1500,
            width: "600px",
            height: "400px",
            borderRadius: "16px",
            marginRight: "24px",
            marginLeft: "300px",
            marginTop: "70px",
            boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
          }}
        >
          <div
            style={{
              // alignItems:"center",
              marginLeft: "235px",
              marginTop: "50px",
              marginBottom: "30px",
              fontSize: "18px",
            }}
          >
            <h2>Signup</h2>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 8,
            }}
            onFinish={collectData}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 16,
                offset: 8,
              }}
            >
              <Button
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "15px",
                }}
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
              <br />
              Alredy Have an account?{" "}
              <Button
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "black",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "15px",
                }}
                htmlType="button"
                className="login-form-button"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Signup;

{
  /* <h1 className="signup-heading">Register</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button type="button" onClick={collectData} className="appButton">
        Sign Up
      </button> */
}
