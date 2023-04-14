import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import 'antd/dist/reset.css';
import { Button, Card, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { message } from 'antd';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if(auth){
      navigate("/");
    }
  },[])

  
  const handleLogin = async (values:{email:string, password:string}) => {
    let email = values.email;
    let password = values.password;
    console.warn(values.email, values.password);
    let result = await fetch("http://localhost:3000/api/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resultData = await result.json();
    console.warn("result.result",resultData.data);
  
    if(resultData.result === "user does not found"){

      message.error(`user not found`);
    }else{
      if(resultData.data == true){
       message.error(resultData.result);
      }else{
        if(resultData.selectloginUserTo[0].name == "admin"){
          console.log("admin");
          localStorage.setItem("user", JSON.stringify(resultData.selectloginUserTo));
          localStorage.setItem("token", JSON.stringify(resultData.auth));
         navigate("/");
        }else{
          localStorage.setItem("user", JSON.stringify(resultData.selectloginUserTo));
          localStorage.setItem("token", JSON.stringify(resultData.auth));
          let id = resultData.selectloginUserTo[0].id;
          console.log(id);
          dispatch({ type: "ADD_USER_PRODUCT", payload:  id  });
          navigate("/product");
        }
      }
      }

  };

  return (
    <>
 
      <div className="login">
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
            <h2>Login</h2>
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
            onFinish={handleLogin}
          >
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
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Card>
        </div>
    </>
  );
};

export default Login;
















   {/* <div className="login">
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="appButton" type="button" onClick={handleLogin}>
        Login
      </button>
    </div> */}