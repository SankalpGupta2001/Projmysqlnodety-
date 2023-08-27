import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { validateBookData } from './utils/Validation';
import Book from './models/BookModels';
const app = express();
const router = express.Router();
app.use(bodyParser.json());


router.get('/api/books', async (req: Request, res: Response) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: "Internal server error." });
    }
});


router.get('/api/books/:id', async (req: Request, res: Response) => {
    const bookId = req.params.id;
    try {
        const book = await Book.findByPk(bookId);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.json(book);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});


router.post('/api/books', async (req: Request, res: Response) => {
    try {
        validateBookData(req.body);
        const { id, title, author, publishedYear } = req.body;
        const book = await Book.create({ id, title, author, publishedYear });
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: "Error Occurred" });
    }
});


router.put('/api/books/:id', async (req: Request, res: Response) => {
    try {
        validateBookData(req.body);
        const bookId = req.params.id;
        const { title, author, publishedYear } = req.body;
        
        const [affectedRows] = await Book.update(
            { title, author, publishedYear },
            { where: { id: bookId } }
        );

        if (affectedRows === 0) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.json({ id: bookId, title, author, publishedYear });
        }
    } catch (error) {
        res.status(400).json({ error: "Error Occurred" });
    }
});


router.delete('/api/books/:id', async (req: Request, res: Response) => {
    const bookId = req.params.id;
    try {
        const deletedRows = await Book.destroy({ where: { id: bookId } });
        if (deletedRows === 0) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.json({ message: 'Book deleted', id: bookId });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

export default router;
