import React from "react";

const Indicator = ({ text }: { text: string }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 w-fit">
      <span className="w-2 h-2 rounded-full bg-accent"></span>
      <span className="text-xs font-bold text-accent tracking-wide uppercase">
        {text}
      </span>
    </div>
  );
};

export default Indicator;