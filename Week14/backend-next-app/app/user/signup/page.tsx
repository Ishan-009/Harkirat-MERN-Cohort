"use client";
import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler() {
    const userData = {
      name,
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user",
        userData
      );

      console.log("Signup Success:", response.data);
    } catch (error) {
      console.log(error);

      alert("Some Error Occured");
    }
  }

  return (
    <div className="flex justify-center flex-col">
      <div className="flex flex-col justify-center items-center mt-20">
        <a
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
        >
          <div className="px-10">
            <div className="text-3xl font-extrabold">Sign Up</div>
          </div>
          <div className="pt-2">
            <LabelledInput
              label="Username"
              placeholder="Ishan09"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="pt-2">
              <LabelledInput
                label="Email"
                placeholder="Ishan@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <LabelledInput
                label="Password"
                type={"password"}
                placeholder="123456"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={submitHandler}
              >
                Sign up
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>; // Correctly typing the onChange handler
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
}
