const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const expenseRoutes = require('./src/routes/expense');
app.use('/expense',expenseRoutes);

app.get('/', (req, res) => res.send('Expense-Tracker is running.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



