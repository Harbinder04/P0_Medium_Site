// Blogs.tsx
import React from 'react';
import { Blogcard } from '../components/Blogcard';
import { Appbar } from '../components/Appbar';
import { useBlogs } from '../hooks/index';
import { format } from 'date-fns';


export const Blogs: React.FC = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center justify-center w-fit md:w-[824px] my-4 mx-4">
                    {blogs.map((blog) => (
                        <Blogcard
                            key={blog.id}
                            id={blog.id}
                            author={blog.author.name}
                            //@ts-ignore
                            title={blog.title || "Title Undefined"}
                            //@ts-ignore
                            content={blog.content || "Unable to fetch the content"}
                            img={blog.img}
                            published_date={format(new Date(blog.published_date), 'MMM dd, yyyy')}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
