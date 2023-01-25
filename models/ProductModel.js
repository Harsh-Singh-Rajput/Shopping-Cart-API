import {Model, DataTypes} from "sequelize"
import sequelize from "../config/sequelize.js"

class Product extends Model{}

Product.init({
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    productImage:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"LINK"
    },
    brand:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cost:{
        type:DataTypes.NUMBER,
        allowNull:false
    }
},
    {sequelize, modelName:"product", timestamps:false}
)

export {Product};