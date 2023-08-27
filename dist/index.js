"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
db_1.default.sync({ force: false }).then(() => {
    console.log('Database synchronized.');
}).catch(error => {
    console.error('Error synchronizing database:', error);
});
app.use(routes_1.default);
const PORT = 3000;
app.listen(PORT, () => console.log(`Express server is running at port no: ${PORT}`));
