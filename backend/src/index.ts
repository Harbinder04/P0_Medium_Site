import { Hono } from 'hono'
import userRoute from '../routes/user'
import bookRouter from '../routes/bolg';

const app = new Hono();

app.route('/api/v1/user', userRoute);
app.route('/api/b1/blog', bookRouter);

export default app
