import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title , setTitle] = useState("");
    const [content, setContent] = useState("");
    const [publish, setPublish] = useState(false);
    const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="mx-10 md:mx-[600px]">
      <div className="flex justify-center w-full mb-4">
        <div className="w-full">
          <input onChange={(e)=>{
            setTitle(e.target.value);
          }}
            type="text"
            className="w-full border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none block p-2.5"
            placeholder="Title"
          />
        </div>
      </div>
            <TextEditor onChange={(e)=>{
            setContent(e.target.value);
          }} ></TextEditor>
            <button onClick={async ()=>{
                setPublish(true)
                const res = await axios.post(`${BACKEND_URL}/api/v1/blog/post`,{
                    title: title,
                    content: content,
                    published:  publish
                },{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${res.data.id}`)
            }}
        type="submit"
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Publish post
      </button>
      </div>
    </div>
  );
};

function TextEditor({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>)=> void}) {
  return (
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
        <div className="px-4 py-2 bg-white rounded-lg border border-slate-400 ">
          <textarea onChange={onChange}
            id="editor"
            rows={8}
            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:outline-none"
            placeholder="Write an article..."
            required
          ></textarea>
        </div>
      </div>
      
  );
}
