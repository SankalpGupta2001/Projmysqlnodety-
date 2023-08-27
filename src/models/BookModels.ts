import sequelize from "../db";
import {  DataTypes } from 'sequelize';

const Book = sequelize.define('books', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publishedYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    timestamps: false, 
})

export default  Book;