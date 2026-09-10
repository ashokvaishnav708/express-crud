import express from 'express';

const app = express();
const port: number = 3000;
const root = import.meta.dirname;

app.set('view engine', 'ejs');

app.listen(port, (error) => {
    if (error) {
        console.log("Error: ", error);
    } else {
        console.log(`Server started on localhost at port ${port}`);
    }
});


app.get('/', (req, res) => {
    const items: { name: string; price: number }[] = [
            { name: 'mobile phone', price: 1000 }, 
            { name: 'book', price: 30 }, 
            { name: 'computer', price: 2000 }
        ];
    res.render('index', { items });
});

app.get('/add-item', (req, res) => {
    res.render('add-item')
});

app.use((req, res) => {
    res.render('error');
});