import React from "react";

export const Spinner: React.FC = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="h-7 w-7 animate-spin rounded-full border-b-2 border-gray-900" />
  </div>
);
