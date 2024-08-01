import { Dropdown } from "@components/Gnb/Dropdown";

export const Gnb: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 z-[50] h-[64px] w-full border-b-[1px] border-gray-200 bg-white">
      <div className="mx-auto my-0 flex h-full max-w-[120rem] flex-row items-center justify-between px-[2rem] py-[1.2rem]">
        <a className="mr-[3.6rem] h-20 w-20 items-center" href="/">
          <img src="/src/assets/image.png" />
        </a>
        <Dropdown />
      </div>
    </div>
  );
};
