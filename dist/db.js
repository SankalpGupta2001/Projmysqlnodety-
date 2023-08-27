"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('BooksDB', 'root', 'Vellore@2020', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true, // Disable SQL query logging
});
exports.default = sequelize;
