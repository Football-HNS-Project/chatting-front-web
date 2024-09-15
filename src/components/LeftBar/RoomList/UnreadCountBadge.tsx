export const UnreadCountBadge = ({ unread }: { unread: number }) => {
  const isOverNinetyNine = unread > 99;

  return (
    <span className="ml-2 flex h-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 px-2 text-xs font-medium text-white">
      {isOverNinetyNine ? "99+" : unread}
    </span>
  );
};
