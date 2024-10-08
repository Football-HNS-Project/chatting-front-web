type TextMessageProps = {
  plainText: string;
  isCurrentUser: boolean;
};

export const TextMessage = ({ plainText, isCurrentUser }: TextMessageProps) => (
  <div
    className={`w-fit max-w-[500px] whitespace-pre-wrap break-words rounded-lg p-[8px] text-[14px] ${
      isCurrentUser ? "bg-orange-200" : "bg-slate-200"
    }`}
  >
    {plainText}
  </div>
);
