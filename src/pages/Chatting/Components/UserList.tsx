import { useNavigate } from "react-router-dom";

import { useAtom } from "jotai";

import { User_Dummy } from "@pages/Chatting/Chatting_Dummy";

import { SelectedUserAtom } from "@stores/ChattingStore";

export const UserList = () => {
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useAtom(SelectedUserAtom);

  return (
    <nav className="flex flex-col w-[72px] py-[20px] px-[13px] border-l-[1px] border-r-[1px] chatting-divider bg-gray-200 gap-[20px]">
      {User_Dummy.map((user) => (
        <a
          key={user.id}
          className="inline-block relative w-[44px] h-[44px]"
          onClick={() => {
            setSelectedUserId(user.id);
            navigate("/chatting");
          }}
        >
          <img
            width={44}
            height={44}
            className={`border-[1px] image-divider rounded-full ${
              selectedUserId === user.id ? "profile-image-selected" : ""
            }`}
            src="/src/assets/Profile.png"
          />
        </a>
      ))}
    </nav>
  );
};
