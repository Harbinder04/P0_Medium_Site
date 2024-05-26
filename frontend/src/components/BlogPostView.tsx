interface BlogPostViewProps{
  title: string,
  content: string,
  publishDate: string,
  author: string
}

export function BlogPostView({title, content, publishDate, author} : BlogPostViewProps) {
  return (
    <div className="md:w-[624px]">
        <div className="font-bold text-3xl mt-3">
            {title}
        </div>
        {/* 2 part  */}
      <div className="flex flex-row my-4 items-center">
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-800 dark:text-gray-300">
            {author.slice(0, 1)}
          </span>
        </div>

        <div className="flex mx-4 flex-col">
        <div>
           {author} . <span className="text-green-500">Follow</span>
        </div>
        <div className="flex flex-col">
        <span className="flex flex-row justify-between w-full">
          {content.length/100 + " min read "} <span className="w-fit flex justify-center items-center mx-4"> | </span>{publishDate}
        </span>
        </div>
        </div>
        </div>
        {/* content div */}
        <div className="text-lg text-4 tracking-wide md:w-full">
          {content}
        </div>
    </div>
  )
}
