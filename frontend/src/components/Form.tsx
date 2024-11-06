import { ChangeEvent, useState } from "react";
import { singnupInput, singninInput} from "@harbinder/medium-blog";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config.ts";

// 📌 bad code 


// tricky part 
// const [postInputSignup, setPostInputSignup] = useState<singnupInput>({
//   email: "",
//   password: "",
//   name: "",
// }); 


// in this file we are making sigin/ signup pages in one 
// Learnings: 
    // onChange with if condition because we are using different zod types(useState<singnupInput>) of the signin and signup 
    // How to upgrade a object using ...c, 
export const Form = ({ formtype }: { formtype: "Sign up" | "Sign in" }) => {
  const navigate = useNavigate();
  const [postInputSignup, setPostInputSignup] = useState<singnupInput>({
    email: "",
    password: "",
    name: "",
  });

  const [postInputSignin, setPostInputSignin] = useState<singninInput>({
    email: "",
    password: "",
  });

  async function sendReq(){
    try{
      const endpoint = `${BACKEND_URL}/api/v1/user/${formtype === "Sign in" ? "signin" : "signup"}`;
      const postData = formtype === "Sign in" ? postInputSignin : postInputSignup;
  
      const response = await axios.post(endpoint, postData);
    const jwt = response.data.jwt;
    localStorage.setItem("token", jwt);
    navigate('/blogs');
    }catch(e){
      alert("Unable to send data")
    }
  }

  return (
    <div className="md:h-auto h-auto w-screen md:w-auto flex justify-center item-center">
      <div className="h-fit md:h-fit w-fit flex justify-center items-center bg-white shadow-md rounded mx-10 md:py-5 md:px-10 pt-2 px-10 pb-6 md:my-0">
        <div className="md:px-6 mx-10 md:mx-4">
          <div className="text-xl font-extrabold mt-4">
            {" "}
            {formtype === "Sign in"
              ? "Enter your details"
              : "Create an account"}
          </div>
          <div className="text-slate-600">
            {formtype === "Sign in"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              className="underline  decoration-1 pl-2"
              to={formtype === "Sign in" ? "/signup" : "/signin"}
            >
              {formtype === "Sign in" ? "Signup" : "Signin"}
            </Link>
          </div>
          <div className="w-80">
            <div className={`${formtype === "Sign in" ? "hidden" : ""}`}>
              <LabelledInput
                label="Name"
                placeholder="Alex Rosh"
                onChange={(e) => {
                  setPostInputSignup((c) => ({  // taking same object and then overriding it. 
                    ...c,
                    name: e.target.value,
                  }));
                }}
                type="text"
              />
            </div>
            <LabelledInput
              label="E-mail"
              placeholder="xyz@gmail.com"
              onChange={(e) => {
                if (formtype === "Sign up") {
                  setPostInputSignup((c) => ({
                    ...c,
                    email: e.target.value,
                  }));
                } else {
                  setPostInputSignin((c) => ({
                    ...c,
                    email: e.target.value,
                  }));
                }
              }}
              type="text"
            />

            <LabelledInput
              label="Password"
              placeholder="8 character minimum"
              onChange={(e) => {
                if (formtype === "Sign up") {
                  setPostInputSignup((c) => ({
                    ...c,
                    password: e.target.value,
                  }));
                } else {
                  setPostInputSignin((c) => ({
                    ...c,
                    password: e.target.value,
                  }));
                }
              }}
              type="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button onClick={sendReq}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              {formtype}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <div className="mb-4 mt-2">
        <label
          className="block text-gray-700 text-md font-medium mb-2"
          htmlFor="UserName"
        >
          {label}
        </label>
        <input
          onChange={onChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline overflow-hidden text-lg"
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}


