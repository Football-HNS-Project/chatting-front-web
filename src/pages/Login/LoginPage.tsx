import { useState } from "react";

import { useNavigate } from "react-router-dom";

import logo from "@assets/image.png";

import { usePostLogin } from "@apis/Auth/PostLogin";
import { instance } from "@apis/AxiosInstance";

import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate } = usePostLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginBtn = () => {
    sessionStorage.setItem("accessToken", "test accessToken");
    navigate("/");

    // mutate(
    //   { username, password },
    //   {
    //     onSuccess: (res) => {
    //       console.log(res);
    //       instance.defaults.headers["Authorization"] =
    //         `Bearer ${res.accessToken}`;
    //       sessionStorage.setItem("accessToken", res.accessToken);
    //       navigate("/");
    //     },
    //   }
    // );
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <img src={logo} width={200} height={200} />
      <span className="text-xl">로그인</span>
      <div className="flex flex-col gap-3">
        <input
          className="h-11 w-72 rounded-3xl bg-gray-200 px-4 py-1"
          placeholder="아이디"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="h-11 w-72 rounded-3xl bg-gray-200 px-4 py-1"
          placeholder="패스워드"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="my-2 flex items-center justify-center space-x-2">
          <Checkbox id="save-id" />
          <label
            htmlFor="save-id"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            아이디 저장
          </label>
        </div>
        <Button onClick={handleLoginBtn}>로그인</Button>
      </div>
    </div>
  );
};
