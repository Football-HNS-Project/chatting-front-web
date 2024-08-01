import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

type RoomPopoverProps = {
  setIsVisibleMenu: (id: string | null) => void;
  roomId: string;
};
export const RoomPopover = ({ setIsVisibleMenu, roomId }: RoomPopoverProps) => {
  return (
    <DropdownMenu
      onOpenChange={(res) => {
        if (res) {
          setIsVisibleMenu(roomId);
        } else {
          setIsVisibleMenu(null);
        }
      }}
    >
      <DropdownMenuTrigger className="rounded-full p-3 outline-none hover:bg-slate-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
