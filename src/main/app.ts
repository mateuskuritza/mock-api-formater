import './setup';
import express from 'express';
import routes from './routes';

const app = express();

// Middlewares
import middlewares from './middlewares';
app.use(middlewares);


app.use(routes);

export default app;