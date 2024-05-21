import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import bycrypt from 'bcryptjs';
import { sign } from 'hono/jwt'
import {env} from 'hono/adapter';
import { Hono } from 'hono';
  
const userRoute = new Hono();
  // sign-up route 
  userRoute.post('/signup', async (c) => {  // c - context
    try {
      const {DATABASE_URL} = env<{DATABASE_URL: string}>(c, 'workerd'); 
      const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
  
      // Check if the user already exists
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });
      
      if (user) {
        // User already exists
        return c.json({ msg: "User already exists" }, 409); // 409 Conflict
      } else {
        const hashedPassword = await bycrypt.hash(body.password, 10);
        const payload = await prisma.user.create({
          data: {
            email: body.email,
            password: hashedPassword,
            name: body.name
          },
        });
        
        const {JWT_SECRET} = env<{JWT_SECRET: string}>(c, 'workerd');
        const token = await sign({id: payload.id}, JWT_SECRET);
  
        return c.json({ jwt: token }, 201);
      }
    } catch (error) {
      console.error(error);
  
      // Return a 500 Internal Server Error response
      return c.json({ err: error, 
        msg: "Internal server error" }, 500);
    }
  });
  
  
  // signin route 
  userRoute.post('/signin', async (c) => {
    try {
      const {DATABASE_URL} = env<{DATABASE_URL: string}>(c, 'workerd'); 
      const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
  
      // Check if the user already exists
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      
      if (!user) {
        // User already exists
        return c.json({ msg: "User not found" }, 409); // 409 Conflict
      } 
  
      const isPasswordValid = await bycrypt.compare(body.password, user.password);
      if(!isPasswordValid){
        return c.body('Invalid password', { status: 401});
      }
      
      const {JWT_SECRET} = env<{JWT_SECRET: string}>(c, 'workerd');
      const token = await sign({id: user.id}, JWT_SECRET);
      return c.json({ jwt: token }, 201);
  
    } catch (error) {
      console.error(error);
  
      // Return a 500 Internal Server Error response
      return c.json({ err: error, 
        msg: "Internal server error" }, 500);
    }
  });
  
  export default userRoute;