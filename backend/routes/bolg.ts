import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { verify } from 'hono/jwt'
import { Hono } from 'hono';
import { UpdateblogInput, createblogInput } from '@harbinder/medium-blog';
const blogRouter = new Hono<{
  Bindings:{
     DATABASE_URL: string,
     JWT_SECRET: string
  },
  Variables: {
    userId : string,
  }
}>();

blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization') || "";
    const tokenToverify = jwt.split(" ")[1];
  
    const user: any = await verify(tokenToverify, c.env.JWT_SECRET);
    if(user){
      c.set("userId", user.id);
    await next()
    }

    return c.json({msg: 'Authentication failed'}, 403);
  });
  
  
  blogRouter.post('/post', async (c) => {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      console.log(c.get('userId'));
      const userId = c.get('userId');
      const body = await c.req.json();
      const success = createblogInput.safeParse(body);
      if(!success){
        return c.json({msg: "Invalid input"}, 400)
      }
      const res = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          img: body.img,
          published_date: new Date(),
          published: body.published,
          authorId: userId
        },
      });
  
      return c.json({id:res.id,
        msg: "Post uploaded successfull"}, 201);
  })
  
  
  blogRouter.put('/post/update', async (c) => {
    const body = await c.req.json();
    const success = UpdateblogInput.safeParse(body);
      if(!success){
        return c.json({msg: "Invalid input"}, 400)
      }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const authorId = c.get('userId');
    if(authorId){
      const validAuthor = prisma.post.findFirst({
        where: {
          authorId: authorId
        }
      })

      if(!validAuthor){
        return c.json({mgs:"Author does not exist"}, 403);
      }
    }

    const data: { title?: string; content?: string; img?: string; published?: boolean } = {};
  
    if (body.title) {
      data.title = body.title;
    }
    
    if (body.content) {
      data.content = body.content;
    }
    
    if (body.img) {
      data.img = body.img;
    }

    if (typeof body.published === 'boolean') {
      data.published = body.published;
    }

    const bolg = await prisma.post.update({
       where:{
        id: body.id
       },
       data: data
    });
    
    return c.json({
      id: bolg.id, 
      msg: "Updated successfully"
    }, 201);
  });
  

    // add Pagination
    blogRouter.get('/bulk', async(c)=>{

      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      try{
      const allPost = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          img: true,
          published_date: true,
          author: {
            select: {
              name: true
            }
          }
        }
      });
      return c.json({allPost});
  
      }catch(error){
        return c.json({error: "Internal server error"}, 500)
      };
    });


  blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          title: true,
          content: true,
          img: true,
          published_date: true,
          author: {
            select: {
              name: true
            }
          }
        }
      });
  
      if (!post) {
        return c.json({ error: 'Post not found' }, 404);
      }
  
      return c.json(post);
    } catch (error) {
      return c.json({ error: 'Error retrieving post' }, 500);
    }
  });


  export default blogRouter;