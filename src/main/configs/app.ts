import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.set('json spaces', 2);
app.use(helmet());
app.use(morgan('dev'));

export { app };
