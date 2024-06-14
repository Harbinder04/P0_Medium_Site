import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlog, BlogType } from '../hooks/index';
import { Appbar } from '../components/Appbar';
import Loader from '../components/Loader';
import { BlogPostView } from '../components/BlogPostView';
import { format } from 'date-fns';
import parse from 'html-react-parser';

export const Blog: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, blog }: { loading: boolean; blog: BlogType | undefined } = useBlog({ id: id || "" });

    const formattedDate = blog?.published_date
        ? format(new Date(blog.published_date), 'MMM dd, yyyy')
        : 'Unknown date';

    if (loading) {
        return <div className='flex justify-center items-center h-screen w-screen'>
            <Loader />
        </div>;
    }

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div>
            <Appbar />
            <div className='flex justify-center items-center mx-3'>
                <BlogPostView  
                //@ts-ignore
                title={parse(blog.title) || "Title Undefined"}
                //@ts-ignore
                    content={parse(blog.content) || "Unable to fetch the content"}
                    img={blog.img || "Cover image"}
                    published_date={formattedDate}
                    author={blog.author.name || "Unknown author"}
                />
            </div>
        </div>
    );
}

export default Blog;
