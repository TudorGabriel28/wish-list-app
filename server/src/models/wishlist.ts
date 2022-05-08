import mongoose from 'mongoose';

export interface WishlistDocument extends mongoose.Document {
  title: String;
  account: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Account'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

WishlistSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'wishlist'
});

const WishlistModel = mongoose.model<WishlistDocument>(
  'Wishlist',
  WishlistSchema
);

export default WishlistModel;
