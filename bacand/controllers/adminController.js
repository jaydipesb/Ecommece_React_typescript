const con = require("../connections/dbconnect");


//add product
const addProduct = async (req,res) => {
    try{
        console.log(req.body);
        console.log(req.file);
        const { title, price,description,category} = req.body;
        const image = req.file.path;
        let [addProduct] = await con.execute(
            `Insert into product (title, description, price, category, image) values ('${title}' , '${description}' ,'${price}', '${category}', '${image}')`
        );
        if(addProduct){
          res.send({message: "data inserted successfully", status: true})
        }else{
            console.log("some error accoured");
        }
    }catch(err){
        console.log(err);
    }
}

//getallproduct
const getAllProduct = async (req,res) =>{
    try {

        let [getAllProduct] = await con.execute(
            `select id,title,description, price, category,image from product`
        );
        if(getAllProduct){
          res.send(getAllProduct);
        }else{
           res.send({message:"some error accoured"});
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (req,res) =>{
    try {
        
        const { id } = req.params;
        console.log(id);
        let [deleteProduct] = await con.execute(
            `DELETE FROM product WHERE id=${id}`
        );
        if(deleteProduct){
          res.send({message:"product deleted successfully"});
        }else{
           res.send({message:"some error accoured"});
        }
    } catch (error) {
        console.log(error);
    }
}

//update product
const updateProduct = async (req,res) => {
    try{
        console.log(req.body);
        let image = req.file.path;
        console.log("image update",req.file.path);
        const { title, price,description,category} = req.body;
        let [updateProduct] = await con.execute(
            `UPDATE product
            SET title = '${title}', price= '${price}', description= '${description}', category= '${category}', image = '${image}'
            WHERE id = ${req.body.id}`
        );
        if(updateProduct){
          res.send({message: "data updated successfully", status: true})
        }else{
            console.log("some error accoured");
        }
    }catch(err){
        console.log(err);
    }
}


//fetch all users

const getAllUsers = async (req,res) =>{
    try {

        let [getAllUsers] = await con.execute(
            `select id,name,email from user`
        );
        if(getAllUsers){
          res.send(getAllUsers);
        }else{
           res.send({message:"some error accoured"});
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    addProduct, 
    getAllProduct,
    deleteProduct,
    updateProduct,
    getAllUsers
}