// load app dependencies
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send({'message': 'My first endpoint is working'});
});
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT} `);
});