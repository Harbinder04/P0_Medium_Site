

import { Appbar } from "../components/Appbar";
import UserBlogPostCard from "../components/UserBlogPostCard";
import {useProfileBlogs} from "../hooks/index"
import { format } from 'date-fns';

export default function Profile() {
  const { loading, blogs, author } = useProfileBlogs();
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
