import { TUser } from "@typings/User";

type SenderInfoProps = {
  isCurrentUser: boolean;
  displayProfile: boolean;
  sender: Omit<TUser, "email">;
};

export const SenderInfo = ({
  isCurrentUser,
  displayProfile,
  sender,
}: SenderInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* TODO : 유저 프로필 이미지 넣기 */}
      {!isCurrentUser && displayProfile ? (
        <div className="h-10 w-10 rounded-full bg-slate-400" />
      ) : (
        <div className="w-10" />
      )}
      {displayProfile && !isCurrentUser && (
        <p className="mb-1 text-sm text-gray-600">{sender.name}</p>
      )}
    </div>
  );
};
