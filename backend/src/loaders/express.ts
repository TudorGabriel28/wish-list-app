import express from 'express';
import accountRouter from '../routes/account';
import sessionRouter from '../routes/session';
import deserializeAccount from '../middlewares/deserializeAccount';
import resetPasswordTokenRouter from '../routes/reset.password.token';
import wishlistRouter from '../routes/wishlist';
import productRouter from '../routes/product';

const cors = require('cors');

const corsOptions = {
  origin: '*',
  exposedHeaders: ['X-Pagination', 'Authorization']
};

const app = express();

app.use(cors(corsOptions));
// middleware
app.use(deserializeAccount);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/api/account', accountRouter);
app.use('/api/session', sessionRouter);
app.use('/api/reset-password', resetPasswordTokenRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/product', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
