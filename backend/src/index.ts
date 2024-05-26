import { Hono } from 'hono'
import userRoute from '../routes/user'
import bookRouter from '../routes/bolg';
import { cors } from 'hono/cors';

const app = new Hono();
app.use(cors());
app.route('/api/v1/user', userRoute);
app.route('/api/v1/blog', bookRouter);

export default app
