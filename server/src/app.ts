import app from './loaders/express';
import mongooseLoader from './loaders/mongoose';

require('dotenv').config();

async function startServer() {
  try {
    await mongooseLoader();
    console.log('Mongoose connected.');

    const port = process.env.PORT || 1337;

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
