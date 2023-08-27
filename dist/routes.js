"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Validation_1 = require("./utils/Validation");
const BookModels_1 = __importDefault(require("./models/BookModels"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use(body_parser_1.default.json());
router.get('/api/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield BookModels_1.default.findAll();
        res.json(books);
    }
    catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: "Internal server error." });
    }
}));
router.get('/api/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    try {
        const book = yield BookModels_1.default.findByPk(bookId);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        }
        else {
            res.json(book);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
}));
router.post('/api/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, Validation_1.validateBookData)(req.body);
        const { id, title, author, publishedYear } = req.body;
        const book = yield BookModels_1.default.create({ id, title, author, publishedYear });
        res.status(201).json(book);
    }
    catch (error) {
        res.status(400).json({ error: "Error Occurred" });
    }
}));
router.put('/api/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, Validation_1.validateBookData)(req.body);
        const bookId = req.params.id;
        const { title, author, publishedYear } = req.body;
        const [affectedRows] = yield BookModels_1.default.update({ title, author, publishedYear }, { where: { id: bookId } });
        if (affectedRows === 0) {
            res.status(404).json({ message: 'Book not found' });
        }
        else {
            res.json({ id: bookId, title, author, publishedYear });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Error Occurred" });
    }
}));
router.delete('/api/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    try {
        const deletedRows = yield BookModels_1.default.destroy({ where: { id: bookId } });
        if (deletedRows === 0) {
            res.status(404).json({ message: 'Book not found' });
        }
        else {
            res.json({ message: 'Book deleted', id: bookId });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
}));
exports.default = router;
