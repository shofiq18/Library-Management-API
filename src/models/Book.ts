import { Schema, model, Document, Model } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  updateAvailability(): void; // Instance method
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: [true, 'Title is required'] },
  author: { type: String, required: [true, 'Author is required'] },
  genre: {
    type: String,
    enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    required: [true, 'Genre is required'],
  },
  isbn: { type: String, required: [true, 'ISBN is required'], unique: true },
  description: { type: String },
  copies: { type: Number, required: [true, 'Copies are required'], min: [0, 'Copies must be non-negative'] },
  available: { type: Boolean, default: true },
}, { timestamps: true });

// Middleware: Pre-save hook to set availability based on copies
bookSchema.pre('save', function (next) {
  this.available = this.copies > 0;
  next();
});

// Instance Method: Update availability after borrow/return
bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
  return this.save();
};

const Book: Model<IBook> = model<IBook>('Book', bookSchema);
export default Book;