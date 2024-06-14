

import { Appbar } from "../components/Appbar";
import UserBlogPostCard from "../components/UserBlogPostCard";
import {useProfileBlogs} from "../hooks/index"
import { format } from 'date-fns';
import axios from "axios";
import { BACKEND_URL } from "../config";
import Loader from "../components/Loader";

export default function Profile() {
  const { loading, blogs, author, setBlogs } = useProfileBlogs();

  const handleDelete = async (id: string) => {
    try {
      console.log("Request sent");
      const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/deletemyPost`, {
        data: { id: id },
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token'),
        },
      });
      console.log("Delete response:", response);
      if (response.status === 200) {
        console.log("Post deleted successfully");
        // Update state to remove the deleted post
        setBlogs(blogs.filter(blog => blog.id !== id));
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("There was an error making the delete request!", error);
      if (error) {
        console.error("Error response data:", error);
      }
    }
  };

  if (loading) {
    return <div className='flex justify-center items-center'>
        <Loader />
    </div>;
}

  return (
    <div className="w-screen h-screen flex flex-col">
      <Appbar />
      <div className="grid grid-cols-6 gap-0">
        <div className="md:col-span-4 col-span-full border-r border-black">
          <div className="mx-2">
            {blogs.map((blog)=>(
              <UserBlogPostCard
              key={blog.id}
              id={blog.id}
              author={blog.author.name}
              //@ts-ignore
              title={blog.title || "Title Undefined"}
              //@ts-ignore
              content={blog.content || "Unable to fetch the content"}
              img={blog.img}
              published_date={format(new Date(blog.published_date), 'MMM dd, yyyy')}
              handleDelete={handleDelete}
            />
            ))}
          </div>
          </div>
          <div className="col-span-2 hidden md:block">
            <div className="m-7">
              {/* avatar started */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-full">
                <span className="font-medium text-gray-800 text-4xl">
                  {author.slice(0, 1)}
                </span>
              </div>
              {/* Avatar closed */}
              <div className="font-medium text-gray-800 text-3xl mt-6">
                {author}
              </div>
              <span className="font-medium text-green-800 text-sm mt-6">
                Edit Profile
              </span>
            </div>
          </div>
      </div>
    </div>
  );
}
