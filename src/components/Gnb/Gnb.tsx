import { useLocation } from "react-router-dom";

import { useSetAtom } from "jotai";

import { Logo } from "@assets/Logo";
import { MenuSvg } from "@assets/MenuSvg";
import { SearchSvg } from "@assets/SearchSvg";

import { Dropdown } from "@components/Gnb/Dropdown";
import { GNB_MENU } from "@components/Gnb/GNB_MENU";

import { UserAtom, User_Dummy } from "@stores/UserStore";

export const Gnb: React.FC = () => {
  const { pathname } = useLocation();

  const isChattingPage = pathname.includes("chatting");

  const setUser = useSetAtom(UserAtom);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[64px] z-[50] bg-white ${
        isChattingPage && "border-b-[1px] border-gray-200"
      }`}
    >
      <div className="flex flex-row h-full items-center px-[2rem] py-[1.2rem] justify-between max-w-[120rem] my-0 mx-auto">
        <a className="mr-[3.6rem] items-center" href="/">
          <Logo />
        </a>

        {!isChattingPage && (
          <nav className="hidden md:flex flex-row w-full pr-[4rem]">
            <ul className="list-none inline-block font-bold">
              {GNB_MENU.map((menu) => (
                <li key={menu.label} className=" inline-block">
                  <a className="text-[1.8rem] mr-[3rem]" href={menu.href}>
                    {menu.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {!isChattingPage ? (
          <div className="flex flex-row items-center justify-center gap-[1.2rem]">
            <button className="lg:hidden">
              <SearchSvg />
            </button>
            <form className="hidden lg:block">
              <input
                type="search"
                placeholder="물품이나 동네를 검색해보세요"
                className="w-[28.8rem] text-[1.6rem] py-[0.9rem] px-[1.2rem] h-[4rem] bg-gray-100 rounded-md"
              />
            </form>
            <button className="md:hidden">
              <MenuSvg />
            </button>
            <a
              href="/chatting"
              className="hidden md:block text-[1.6rem] px-[1.6rem] py-[0.8rem] w-fit font-bold whitespace-nowrap rounded-md border-[1px] border-gray-400 hover:bg-gray-100 hover:opacity-[0.7]"
            >
              채팅하기
            </a>
          </div>
        ) : (
          <>
            <div className="flex gap-5">
              {User_Dummy.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setUser({ id: v.id, name: v.name });
                  }}
                >
                  {v.name}
                </button>
              ))}
            </div>
            <Dropdown />
          </>
        )}
      </div>
    </div>
  );
};
