import { useState } from "react";

export const MessageForm = () => {
  const [inputMessage, setInputMessage] = useState("");
  // const { sendMessage } = useContext(WebSocketContext);
  // const { id } = useParams<{ id: string }>();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // sendMessage({
    //   type: "SEND_MESSAGE_REQUEST",
    //   data: { roomId: String(id), message: inputMessage, type: "text" },
    // });
    setInputMessage("");
    return;
  };

  return (
    <form className="flex relative flex-col m-[16px] h-[125px] justify-between rounded-lg border-[1px] border-gray-900">
      <textarea
        value={inputMessage}
        maxLength={1000}
        placeholder="메시지를 입력해주세요"
        className="mt-[12px] mx-[12px] w-[calc(100%-24px)] h-[63px] p-0 resize-none text-[14px] outline-none"
        onChange={(e) => {
          setInputMessage(e.target.value);
        }}
      />
      <div className="flex justify-between my-[8px] mx-[10px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex w-[32px] h-[32px] bg-slate-500" />
          <div className="flex w-[32px] h-[32px] bg-slate-500" />
          <div className="flex w-[32px] h-[32px] bg-slate-500" />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
          disabled={inputMessage.length <= 0}
          className={`w-[64px] h-[32px] font-bold text-[14px] text-white rounded-md ${
            inputMessage.length > 0 ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          전송
        </button>
      </div>
      <span className="absolute right-[84px] bottom-[11px] text-[12px] text-gray-500">
        {inputMessage.length}/1000
      </span>
    </form>
  );
};
