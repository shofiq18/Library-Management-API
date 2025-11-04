import { Request, Response } from 'express';
import Book, { IBook } from '../models/Book';

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ success: true, message: 'Book created successfully', data: book });
  } catch (err: any) {
    res.status(400).json({ message: 'Validation failed', success: false, error: err });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;
    const query: any = filter ? { genre: filter } : {};
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit));
    res.json({ success: true, message: 'Books retrieved successfully', data: books });
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', success: false, error: err.message });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: 'Book not found', success: false, error: 'Not found' });
    res.json({ success: true, message: 'Book retrieved successfully', data: book });
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', success: false, error: err.message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ message: 'Book not found', success: false, error: 'Not found' });
    res.json({ success: true, message: 'Book updated successfully', data: book });
  } catch (err: any) {
    res.status(400).json({ message: 'Validation failed', success: false, error: err });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return res.status(404).json({ message: 'Book not found', success: false, error: 'Not found' });
    res.json({ success: true, message: 'Book deleted successfully', data: null });
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', success: false, error: err.message });
  }
};