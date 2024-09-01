import express from 'express';
import connection from './db.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Сервер работает!');
  });
  
 

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err.stack);
            res.status(500).json({ error: 'Ошибка на сервере' });
            return;
        }
        res.json(results);
    });
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
    connection.query(query, [name, price], (err, results) => {
        if (err) {
            console.error('Ошибка вставки данных:', err.stack);
            res.status(500).json({ error: 'Ошибка на сервере' });
            return;
        }
        res.status(201).json({ message: 'Продукт успешно добавлен', productId: results.insertId });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});


