import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks/index'
import { Appbar } from '../components/Appbar';
import { BlogPostView } from '../components/BlogPostView'

interface BlogPostView{
    title: string,
    content: string,
    publishDate: string,
    author: string
  }

export const Blog = () => {
    const {id} = useParams();
    const {loading, blog } = useBlog(
        {id: id || ""}
    );

    if(loading) {
        return <div>
            loading...
        </div>
    }

    return (
      <div>
        <div>
        <Appbar/>
        </div>
        <div className='flex justify-center items-center mx-3'>
            <BlogPostView title={blog?.title || "Title Undefined"}
          content={blog?.content || "Content not available"}
          publishDate={blog?.publishDate || "Unknown publish date"}
          author={blog?.author.name || "Unknown author"} />
        </div>
      </div>
    )
}
