const express = require('express');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/products', productsRouter);

app.get('/', (req, res) => res.send('Welcome to My E-commerce App'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
