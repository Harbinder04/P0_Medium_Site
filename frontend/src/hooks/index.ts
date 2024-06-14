import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import parse from 'html-react-parser';

interface Blogs {
    id: string;
    author: {
        name: string;
    };
    title: string ;
    content: string ;
    img: string;
    published_date: string; 
}

export interface BlogType {
    id: string,
    title: string ,
    content: string ,
    img: string,
    published_date?: string | ""
    author: {
        name: string
    }
}

export const useBlog = ({id}: {id: string})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogType>();

    useEffect(()=>{
        console.log("request sent");
       axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
       }).then(
        response => {
            setBlog(response.data);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching blog:", error);
            setLoading(false);
        });
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);

    useEffect(()=>{
        console.log("request sent");
       axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
       }).then(
        response => {
            const transformedBlogs = response.data.allPost.map((blog: BlogType) => ({
                ...blog,
                title: parse(blog.title),  //overriding title to get the data in correct form [object][object]... problem
                content: parse(blog.content),
            }));
            setBlogs(transformedBlogs);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
    }, [])

    return {
        loading,
        blogs
    }
}

export const useProfileBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [author, setAuthor] = useState("");
    useEffect(()=>{
        console.log("request sent");
       axios.get(`${BACKEND_URL}/api/v1/blog/posts/byAuthor`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
       }).then(
        response => {
            console.log(response);
            const transformedBlogs = response.data.map((blog: BlogType) => ({
                ...blog,
                title: parse(blog.title),  //overriding title to get the data in correct form [object][object]... problem
                content: parse(blog.content),
            }));
            setBlogs(transformedBlogs);
            setAuthor(response.data[0].author.name);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
    }, [blogs]);

    return {
        loading,
        blogs,
        author,
        setBlogs
    }
}