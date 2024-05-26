import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Blogs {
    id: string;
    author: {
        name: string;
    };
    title: string;
    content: string;
    publishedDate: string; // or Date if you prefer
}

export interface Blog {
    "id": string,
    "title": string,
    "content": string,
    "publishDate"?: string | "24. Mar 2024"
    "author": {
        "name": string
    }
}

export const useBlog = ({id}: {id: string})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=>{
        console.log("request gayi");
       axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
       }).then(
        response => {
            setBlog(response.data);
            setLoading(false);
        })
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
        console.log("request gayi");
       axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
       }).then(
        response => {
            console.log("response too aya");
            setBlogs(response.data.allPost);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }
}