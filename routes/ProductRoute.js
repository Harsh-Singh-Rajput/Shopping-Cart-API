import sequelize from "../config/sequelize.js";
import {  Product } from "../models/ProductModel.js";
import express from "express";
const router = express.Router()

sequelize.sync().then(() =>{
    console.log("DB is Running");
})


router.get("/", async(req,res)=>{
    const allProducts = await  Product.findAll()
    return res.status(200).send({products:allProducts})
})


router.get("/:id", async(req,res)=>{
    const id = req.params.id
    const product = await  Product.findOne({
        where:{
            id
        }
    })
    if(product) return res.status(200).send(product)
    return res.status(404).send({err:` Product with id:${id} not found`})
})


router.post("/add", async(req,res)=>{
    const {name, description , productImage , date, brand, cost} = req.body
    if(!req.body.hasOwnProperty("name") || !name){
        return res.status(400).send({err:`name key is missing or its value is null or empty`})
    }
    if(!req.body.hasOwnProperty("description") ||  !description){
        return res.status(400).send({err:`description key is missing or its value is null or empty`})
    }
    if(!req.body.hasOwnProperty("productImage") || !productImage){
        return res.status(400).send({err:`productImage key is missing or its value is null or empty`})
    }
    if(!req.body.hasOwnProperty("date") || !date){
        return res.status(400).send({err:`date key is missing or its value is null or empty`})
    }
    if(!req.body.hasOwnProperty("brand") || !brand){
        return res.status(400).send({err:`brand can't be null or empty`})
    }
    if(!req.body.hasOwnProperty("cost") || !cost){
        return res.status(400).send({err:`cost can't be null or empty`})
    }
    const createProduct = {
        name,
        description,
        productImage,
        date,
        brand,
        cost
    }
    const product = await  Product.create(createProduct)
    if(product) return res.status(201).send(product)
    return res.status(404).send({err:` Product not added`})
})


router.put("/:id", async(req,res)=>{
    const id = req.params.id
    const findProduct = await Product.findOne({
        where:{
          id
        }
      })
    if(!findProduct) return res.status(404).send({err:"Product Not Found"})
    
    let updateProduct = {}

    const {name, description , productImage , date, brand, cost} = req.body

    if(req.body.hasOwnProperty("name") || name){
        updateProduct["name"] = name
    }
    if(req.body.hasOwnProperty("description") ||  description){
        updateProduct["description"] = description
    }
    if(req.body.hasOwnProperty("productImage") || productImage){
        updateProduct["productImage"] = productImage
    }
    if(req.body.hasOwnProperty("date") || date){
        updateProduct["date"] = date
    }
    if(req.body.hasOwnProperty("brand") || brand){
        updateProduct["brand"] = brand
    }
    if(req.body.hasOwnProperty("cost") || cost){
        updateProduct["cost"] = cost
    }
    
    const updatedProduct = await  Product.update(updateProduct, {
        where:{
            id
        }
    })
    if(updatedProduct) return res.status(200).send(updateProduct)
    return res.status(404).send({err:` Product with id:${id} not updated`})
})


router.delete("/:id", async(req,res)=>{
    const id = req.params.id
    const product = await  Product.destroy({
        where:{
            id
        }
    })
    if(product) return res.status(200).send({message:` Product with id:${id} is deleted successfully`})
    return res.status(404).send({err:` Product with id:${id} is not deleted`})
})

export default router