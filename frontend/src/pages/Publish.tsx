import { Dispatch, SetStateAction, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import '../custom_css/Publish.css' 

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImage] = useState("");
  const [publish, setPublish] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setPublish(true);
      const res = await axios.post(`${BACKEND_URL}/api/v1/blog/post`, {
        title,
        content,
        img,
        published: publish,
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      navigate(`/blog/${res.data.id}`);
    } catch (error) {
      console.error("Error publishing the post", error);
    }
  };

  return (
    <div>
    <div>
      <Appbar />
      </div>
    <div className="mx-10">
      <div className="flex justify-center w-full mb-4">
        <div className="w-full">
          <input
            onChange={(e) => setImage(e.target.value)}
            type="text"
            className="w-full border border-gray-400 text-gray-900 text-sm rounded-lg focus:outline-none block p-2.5"
            placeholder="Enter Image URL here"
          />
        </div>
      </div>
      
      <MyEditor setTitle={setTitle} setContent={setContent} />
      <button
        onClick={handleSubmit}
        type="submit"
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Publish post
      </button>
    </div>
    </div>
  );
}

interface MyEditorProps {
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
}

function MyEditor({ setTitle, setContent }: MyEditorProps) {
  const [title, setEditorTitle] = useState('');
  const [content, setEditorContent] = useState('');

  const handleTitleChange = (value: string) => {
    setEditorTitle(value);
    setTitle(value);
  };

  const handleContentChange = (value: string) => {
    setEditorContent(value);
    setContent(value);
  };

  return (
    <div>
      <div className="editor-container">
      <ReactQuill
        placeholder="Title"
        theme="bubble"
        modules={MyEditor.titleModules}
        formats={MyEditor.titleFormats}
        onChange={handleTitleChange}
        value={title}
        className='font-bold'
      />
      </div>
      <div className="w-full mb-4 border ">
      <div className="px-4 py-2 bg-white">
      <ReactQuill
        placeholder="Write your content here..."
        theme="bubble"
        modules={MyEditor.modules}
        formats={MyEditor.formats}
        onChange={handleContentChange}
        value={content}
      />
      </div>
      </div>
    </div>

  );
}

MyEditor.titleModules = {
  toolbar: false, // No toolbar for title
};

MyEditor.titleFormats = [
  'header', // Limited to header formatting
];

MyEditor.modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image'],
    ['code-block'],
    ['clean']
  ]
};

MyEditor.formats = [
  'font',
  'size',
  'bold', 'italic', 'underline',
  'list', 'bullet',
  'align',
  'color', 'background',
  'link',
  'image',
  'code-block'
];
