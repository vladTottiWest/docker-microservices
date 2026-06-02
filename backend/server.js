const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Налаштування підключення до БД (дані беруться з Docker Compose)
const db = mysql.createConnection({
    host: 'database', // Назва сервісу в docker-compose
    user: 'user',
    password: 'password',
    database: 'micro_db'
});

app.get('/status', (req, res) => {
    db.query('SELECT VERSION() AS version', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Помилка підключення до БД', error: err.message });
        }
        res.json({
            message: 'Зв\'язок із MySQL встановлено успішно!',
            dbVersion: results[0].version
        });
    });
});

app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
});