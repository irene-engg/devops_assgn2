const express = require('express');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

// Use environment variable for PORT or default to 3000
const PORT = process.env.PORT || 3000;

// Add logging for database initialization
console.log('Initializing database...');
db.init()
    .then(() => {
        console.log('Database initialized successfully.');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    });

// Graceful shutdown
const gracefulShutdown = () => {
    console.log('Shutting down gracefully...');
    db.teardown()
        .catch((err) => {
            console.error('Error during teardown:', err);
        })
        .finally(() => {
            process.exit();
        });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
