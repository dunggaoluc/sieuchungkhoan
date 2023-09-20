import React from "react";

interface IPayload {
  label: string;
  value: string;
}

interface IProps {
  payload: IPayload[];
  onClick(value: string): void;
  activeTab: string;
}

const Tabs: React.FC<IProps> = ({ payload, onClick, activeTab }) => {
  if (payload.length === 0) return null;
  return (
    <div className="w-full flex flex-row items-center justify-center space-x-2">
      {payload.map((item: IPayload) => (
        <button
          key={`tab-${item.value}`}
          onClick={() => onClick(item.value)}
          className={`border-2  py-1 px-4 uppercase transition-all ${
            activeTab === item.value ? "text-black border-black font-semibold" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
