import express from 'express';
import itemRoutes from './routes/itemRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/api/items', itemRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));