import { FaBoxOpen } from "react-icons/fa";

const NoDataInteractive = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-white border-_medium-gray border-2 rounded-lg h-[130px]">
      <FaBoxOpen className="no-data-icon  animate-bounce text-3xl mb-3" />
      <p className="text-sm font-semibold">비어 있음</p>
    </div>
  );
};

export default NoDataInteractive;
