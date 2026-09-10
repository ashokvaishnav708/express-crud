import express from 'express';
const app = express();

const port: number = 3000;

app.listen(port, (error) => {
    if (error) {
        console.log("Error: ", error);
    } else {
        console.log(`Server started on localhost at port ${port}`);
    }
});


app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>');
});

app.get('/add-item', (req, res) => {
    res.send('<h1>Add items</h1>')
});