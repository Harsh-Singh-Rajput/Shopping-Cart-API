import Sequelize from "sequelize";

const sequelize = new Sequelize("product-db", process.env.USER, process.env.PASSWORD, {
    dialect:"sqlite",
    host:"./config/product-db.sqlite"
})

export default sequelize