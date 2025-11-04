import { Request, Response } from 'express';
import Borrow, { IBorrow } from '../models/Borrow';
import Book from '../models/Book';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found', success: false, error: 'Not found' });
    if (book.copies < quantity) return res.status(400).json({ message: 'Not enough copies available', success: false, error: 'Insufficient copies' });

    // Business Logic: Deduct copies and update availability using instance method
    book.copies -= quantity;
    await book.updateAvailability(); // Calls the instance method

    const borrow = new Borrow({ book: bookId, quantity, dueDate });
    await borrow.save();

    res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
  } catch (err: any) {
    res.status(400).json({ message: 'Validation failed', success: false, error: err });
  }
};

export const getBorrowedSummary = async (req: Request, res: Response) => {
  try {
    // Aggregation Pipeline: Group by book, sum quantity, lookup book details
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books', // Collection name
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $unwind: '$bookDetails',
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.json({ success: true, message: 'Borrowed books summary retrieved successfully', data: summary });
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', success: false, error: err.message });
  }
};