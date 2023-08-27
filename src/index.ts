import express from 'express';
import bodyParser from 'body-parser';
import sequelize from "./db";
import BookRoutes from './routes';
const app = express();
app.use(bodyParser.json());

sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized.');
}).catch(error => {
    console.error('Error synchronizing database:', error);
});

app.use(BookRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Express server is running at port no: ${PORT}`));

