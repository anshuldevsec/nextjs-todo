"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `/api/auth/register`,
        data: {
          name,
          email,
          password,
        },
      });
      const data = response.data;
      // console.log(data);
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      return router.replace("/login");
    } catch (error) {
      console.log(error.message);
      return toast.error("Fill All Fields")
    }
  };

  return (
    <div className="login">
      <section>
        <form onSubmit={registerHandler}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Your Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Your Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Your Password"
          />
          <button type="submit">Signup</button>
          <p>Or</p>
          <Link href={"/login"}>Already have account?</Link>
        </form>
      </section>
    </div>
  );
};
export const metadata = {
  title: "Register",
  description: "This is Register Page for Todo app",
};
export default page;
