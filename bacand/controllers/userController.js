const con = require("../connections/dbconnect");
const Jwt = require("jsonwebtoken");
const jwtKey = "jaydip";
const bcrypt = require("bcrypt");

//Authentication Controller
const registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    let password = req.body.password;
    console.log(password);
    var snum = await bcrypt.genSalt(10);
    var passwordStrong = await bcrypt.hash(password, snum);
    console.log(passwordStrong);
    let [addStudent] = await con.execute(
      `Insert into user (name, email, password) values ('${name}' , '${email}' ,'${passwordStrong}')`
    );

    let selectStudent = await con.execute(
      `select name, email, password from user where id="${addStudent.insertId}"`
    );
    // res.send(selectStudent[0]);
    let result = selectStudent[0];
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ result: "Something went wrong" });
      }
      res.send({ result, auth: token });
    });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    let selectloginUser = await con.execute(
      `select id, name, email, password from user where email="${req.body.email}" `
    );
    console.log(selectloginUser[0]);
 

    if (selectloginUser[0] == "") {
      console.log("user does not exist");
      res.send({ result: "user does not found" });
    } else {
        console.log("password", selectloginUser[0][0].password);
        var comparePassword = selectloginUser[0][0].password;
        var compare = await bcrypt.compare(req.body.password, comparePassword);
        console.log(compare);
      if (compare) {
        let selectloginUserTo = selectloginUser[0];
        Jwt.sign(
          { selectloginUserTo },
          jwtKey,
          { expiresIn: "2h" },
          (err, token) => {
            if (err) {
              res.send({ result: "Something went wrong" });
            }
            res.send({ selectloginUserTo, auth: token });
          }
        );
      } else {
        res.send({ result: "email and password does not match", data: true});
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};

// const getAllStudent = async (req, res) => {
//     try {
//         let [allStudent] = await con.execute(
//             `select id, name, email, contact, status from student`
//         );
//         if (allStudent.length) {
//             res.send(allStudent);
//         } else res.send("Data not found");
//     } catch (err) {
//         console.log(err);
//     }
// };

// const addStudentData = async (req,res) => {
//     try{
//         const { name, email, contact } = req.body;
//         let [addStudent] = await con.execute(
//             `Insert into student (name, email, contact) values ('${name}' , '${email}' ,'${contact}')`
//         );
//         if(addStudent){
//             console.log("data inserted succesfully");
//         }else{
//             console.log("some error accoured");
//         }
//     }catch(err){
//         console.log(err);
//     }
// }

// const deleteStudent = async (req,res) => {
//     try{
//         const { id } = req.params;
//         let [deleteStudent] = await con.execute(
//             `delete from student where id="${id}"`
//         );
//         if(deleteStudent){
//             console.log("data deleted succesfully");
//         }else{
//             console.log("some error accoured");
//         }
//     }catch(err){
//         console.log(err);
//     }
// }

// const getEditstudent = async (req,res) => {
//     try{
//         const { id } = req.params;
//         let [result] = await con.execute(
//             `select id, name, email, contact from student where id=${id}`
//         );
//         if(result){
//             res.send(result);
//         }else{
//             console.log("some error accoured");
//         }
//     }catch(err){
//         console.log(err);
//     }
// }

// const updateStudent = async (req,res) => {
//     try{
//         const { id } = req.params;
//         console.log(id);
//         const { name, email, contact } = req.body;
//         let [updateStudent] = await con.execute(
//             `update student set name="${name}", email="${email}", contact="${contact}" where id = ${id}`
//         );
//         if(updateStudent){
//             res.send(updateStudent);
//         }else{
//             console.log("some error accoured");
//         }
//     }catch(err){
//         console.log(err);
//     }
// }

// const updateStudentStatus = async (req,res) => {
//     try{
//         const { id } = req.params;
//         console.log(id);
//         let statusResult;
//         let [checkStatus] = await con.execute(
//             `select status from student where id=${id}`
//         );
//         if(checkStatus){
//             if (checkStatus[0].status == "Active") {
//                 statusResult = "Inactive";
//               } else {
//                 statusResult = "Active";
//               }
//               let [updateStatus] = await con.execute(
//                 `update student set status="${statusResult}" where id = ${id}`
//             );
//             if(updateStatus){
//                 res.send(updateStatus);
//             }else{
//                 console.log("some error accoured");
//             }
//         }else{
//             console.log("some error accoured");
//         }

//     }catch(err){
//         console.log(err);
//     }
// }

// const filterStatus = async (req,res) => {
//     try{
//         const { status } = req.params;
//         console.log(status);
//         let [filterStatus] = await con.execute(
//             `select id, name, email, contact, status from student where status="${status}"`
//         );
//         if(filterStatus){
//             res.send(filterStatus);
//         }else{
//             console.log("some error accoured");
//         }
//     }catch(err){
//         console.log(err);
//     }
// }
