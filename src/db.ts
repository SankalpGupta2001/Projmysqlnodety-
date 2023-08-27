import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('BooksDB', 'root', 'Vellore@2020', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true, // Disable SQL query logging
});
export default sequelize;