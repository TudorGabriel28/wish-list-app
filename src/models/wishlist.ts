import mongoose from 'mongoose';

export interface WishlistDocument extends mongoose.Document {
  title: String;
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

const WishlistModel = mongoose.model<WishlistDocument>(
  'Wishlist',
  WishlistSchema
);

export default WishlistModel;
