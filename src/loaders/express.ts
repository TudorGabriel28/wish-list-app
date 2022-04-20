import express from 'express';
import accountRouter from '../routes/account';
import sessionRouter from '../routes/session';
import deserializeAccount from '../middlewares/deserializeAccount';
import resetPasswordTokenRouter from '../routes/reset.password.token';
import wishlistRouter from '../routes/wishlist';

const app = express();

// middleware
app.use(deserializeAccount);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/api/accounts', accountRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/reset-password', resetPasswordTokenRouter);
app.use('/api/wishlist', wishlistRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
