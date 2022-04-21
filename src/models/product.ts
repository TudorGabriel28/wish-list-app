import mongoose from 'mongoose';

export interface ProductDocument extends mongoose.Document {
  name: String;
  picture: String;
  description: String;
  wishlist: String;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    picture: { type: String, required: true },
    description: { type: String, required: true },
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Wishlist'
    }
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema);

export default ProductModel;
