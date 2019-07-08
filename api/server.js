// load app dependencies
import express from 'express';
import '@babel/polyfill';

const app = express();

const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send('The API is necessary to run this application');
});

app.listen(port).on('listening', () => {
console.log(`This server is live on ${port}`);
});

export default app;
