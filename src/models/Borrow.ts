import { Schema, model, Document, Model } from 'mongoose';

export interface IBorrow extends Document {
  book: Schema.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: [true, 'Book ID is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be positive'] },
  dueDate: { type: Date, required: [true, 'Due date is required'] },
}, { timestamps: true });

// Post-save hook example (for logging, as we need at least one post middleware)
borrowSchema.post('save', function (doc) {
  console.log(`Borrow record saved for book: ${doc.book}`);
});

const Borrow: Model<IBorrow> = model<IBorrow>('Borrow', borrowSchema);
export default Borrow;