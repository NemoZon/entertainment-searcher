import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import userRouter from '@routers/user.router';
import categoryRouter from '@routers/category.router';
import eventRouter from './routers/event.router';
import locationRouter from './routers/location.router';
import preferenceRouter from './routers/preference.router';
import favoriteRouter from './routers/favorite.router';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import rateLimit from 'express-rate-limit';

const app: Express = express();

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max par IP
});

// Configuration API
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', limiter);

// Autres
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/events', eventRouter);
app.use('/api/locations', locationRouter );
app.use('/api/preferences', preferenceRouter );
app.use('/api/favorites', favoriteRouter );

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
