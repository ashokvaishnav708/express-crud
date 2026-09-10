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
    res.render('index', { root });
});

app.get('/add-item', (req, res) => {
    res.render('add-item', { root })
});

app.use((req, res) => {
    res.render('error', { root });
});