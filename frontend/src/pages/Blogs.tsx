import { Blogcard } from '../components/Blogcard'
import { Appbar } from '../components/Appbar'
import {useBlogs} from '../hooks/index';

export const Blogs = ()=>{
    const {loading, blogs} = useBlogs();

    if(loading) {
        return <div>
            loading...
        </div>
    }

    return <div>

        <Appbar/>
        <div className='flex flex-col items-center justify-center max-w-full md:max-w-3xl my-4 mx-4'>
        {blogs.map(blog => <Blogcard 
        key={blog.id}
        id={blog.id}
        author={blog.author.name}
        title={blog.title}
        content={blog.content}
        publishedDate={"12 Mar-2024"}/>)}
        </div>
    </div>
}