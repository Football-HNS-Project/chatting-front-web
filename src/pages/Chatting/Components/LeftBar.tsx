import { useAtom, useAtomValue } from "jotai";

import { RoomList } from "@pages/Chatting/Components/RoomList";

import { TAB_MENU, TabAtom } from "@stores/TabStore";
import { UserAtom } from "@stores/UserStore";

export const LeftBar = () => {
  // const navigate = useNavigate();
  const user = useAtomValue(UserAtom);
  // const [selectedUser, setSelectedUser] = useState<TUser>({} as TUser);
  const [tab, setTab] = useAtom(TabAtom);

  return (
    <nav className="flex flex-col border-r-[1px] w-[312px] min-w-[312px]">
      <div className="flex h-[64px] min-h-[64px] items-center px-[20px] border-b-[1px] chatting-divider">
        <span className="font-bold text-[16px]">{user.name}</span>
      </div>
      {/* 탭 */}
      <div className="flex h-[50px] flex-shrink-0">
        {TAB_MENU.map((t) => (
          <div
            key={t.path}
            className={`flex items-center justify-center w-1/2 cursor-pointer text-[12px] ${
              tab === t.path
                ? "bg-white font-bold border-b-[3px] border-slate-400"
                : "bg-white border-b-[1px]"
            }`}
            onClick={() => {
              setTab(t.path);
            }}
          >
            {t.label}
          </div>
        ))}
      </div>
      {/* 패널 */}
      {tab === "user" ? <div>유저</div> : <RoomList />}
    </nav>
  );
};

{
  /* <div className="flex flex-row-reverse h-[44px] min-h-[44px] px-[6px] text-[12px] items-center border-b-[1px] chatting-divider">
  <label className="flex p-[6px] text-[13px] text-gray-500 cursor-pointer gap-[4px] tracking-tight rounded-md select-none hover:bg-gray-200 duration-[0.6s] active:bg-gray-300 active:duration-0 active:transition-colors">
    <span>안읽은 메시지만 보기</span>
    <input
      type="checkbox"
      hidden
      onClick={() => setIsChecked(!isChecked)}
    />
    {isChecked ? <UnCheckedSvg /> : <CheckedSvg />}
  </label>
</div> */
}
