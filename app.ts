import express from 'express';

const app = express();
const port: number = 3000;
const root = import.meta.dirname;

app.listen(port, (error) => {
    if (error) {
        console.log("Error: ", error);
    } else {
        console.log(`Server started on localhost at port ${port}`);
    }
});


app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root });
});

app.get('/add-item', (req, res) => {
    res.sendFile('./views/add-item.html', { root })
});

app.use((req, res) => {
    res.sendFile('./views/error.html', { root });
});