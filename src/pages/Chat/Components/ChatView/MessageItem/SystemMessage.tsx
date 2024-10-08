import React from "react";

type SystemMessageProps = {
  plainText: string;
};

export const SystemMessage = React.memo(({ plainText }: SystemMessageProps) => (
  <div className="flex justify-center py-5">
    <span className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-500">
      {plainText}
    </span>
  </div>
));
