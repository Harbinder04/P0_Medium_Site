import React, { useEffect } from "react";
import { ReactNode } from "react";
import { MdDelete } from "react-icons/md";

type UserBlogPostCard = {
  id: string;
  author: string;
  title: string;
  content: string;
  img: string;
  published_date: string;
  handleDelete: Function;
};

const extractTextContent = (node: ReactNode): string => {
    if (typeof node === 'string') {
        return node;
    }
    if (Array.isArray(node)) {
        return node.map(extractTextContent).join('');
    }
    if (React.isValidElement(node)) {
        return extractTextContent(node.props.children);
    }
    return '';
};

export default function UserBlogPostCard({
  id,
  author,
  title,
  content,
  img,
  published_date, 
  handleDelete
}: UserBlogPostCard) {
  const textContent = extractTextContent(content);
  const isLongContent = textContent.length > 15;
  const displayedContent = isLongContent
    ? textContent.slice(0, 50) + "...."
    : textContent;


  return (
    <div className="m-4 border-b shadow-sm">
      <div className="grid grid-cols-6 gap-0">
        {/* content part grid */}
        <div className="col-span-4  p-2">
          <div>
            <div className="flex flex-row p-1">
              {/* avatar started */}
              <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full">
                <span className="font-medium text-gray-800 dark:text-gray-300">
                  {author.slice(0, 1)}
                </span>
              </div>
              {/* Avatar closed */}

              <span className="text-sm font-semibold p-2 text-slate-900">
                {author}
              </span>
            </div>
            {/* title and content part  */}
            <div className="font-bold text-2xl mt-3">{title}</div>
            <div className="font-normal text-md mt-3 text-slate-600">
              {isLongContent ? displayedContent : content}
            </div>
            <div className="flex justify-between items-center">
              <div className="font-thin text-sm mt-3 text-slate-500 p-3">
                {published_date}
              </div>
              <button onClick={() => handleDelete(id)}>
              <p className="text-lg font-medium text-gray-900 mr-10 hover:text-gray-500 cursor-pointer">
              <MdDelete />
              </p>
              </button>
            </div>
          </div>
        </div>
        {/* content part grid end*/}
        <div className="flex justify-center items-center col-span-2 p-2">
        
          <img src={img} alt="Cover image" className="h-44 w-44" />
        
        </div>
      </div>
    </div>
  );
}
