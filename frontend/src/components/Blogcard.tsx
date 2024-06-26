import { Link } from "react-router-dom";
import React from "react";
import { ReactNode } from 'react';

interface BlogCardPorps {
  id: string;
  author: string;
  title: string;
  content: string;
  img: string;
  published_date: string;
}

//ensure that getting text
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


export function Blogcard({
  id,
  author,
  title,
  content,
  img,
  published_date,
}: BlogCardPorps) {
  const textContent = extractTextContent(content);
    const isLongContent = textContent.length > 100;
    const displayedContent = isLongContent ? textContent.slice(0, 100) + '....' : textContent;
  return (
    <Link to={`/blog/${id}`}>
    <div className="flex flex-row justify-between py-2 border-b-[1px] shadow-sm m-2 w-full">
    <div className="flex flex-col m-2 md:ml-10 hover:cursor-pointer w-3xl">
      {/* post upper part started */}
      <div className="flex space-x-4 items-center">
        {/* avatar started */}
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-800 dark:text-gray-300">
            {author.slice(0, 1)}
          </span>
        </div>
        {/* Avatar closed */}
        <div className="flex flex-row font-light p-2 text-slate-500">
          {author}
          <span className="flex items-center justify-center flex-row mx-3">
            {" "}
            .{" "}
          </span>
          <span className="font-thin space-x-5 text-sm flex items-center justify-center flex-row mx-3">
            {" "}
            {published_date}
          </span>
        </div>
      </div>{" "}
      {/* post upper part closed */}
      <div className="font-bold text-2xl mt-3">{title}</div>
      <div className="font-normal text-md mt-3 text-slate-600">
      {isLongContent ? displayedContent : content}
      </div>
      {/* main body closed */}
      <div className="flex justify-between items-center">
        <div className="font-thin text-sm mt-3 text-slate-500 p-3">{`${Math.ceil(
          content.length / 100
        )} min. read`}</div>
        <p className="text-lg font-medium text-gray-900 dark:text-white mr-10">
          ...
        </p>
      </div>
    </div>
    <div className="md:flex justify-center items-center hidden md:visible md:ml-6 md:mr-2">
        <img src={img} alt="Cover.png" className="w-80" />
      </div>
    </div>
    </Link>
  );
}
