function Skeleton() {
  return (
    <div className="mb-10">
      <div className=" font-semibold mb-4">
        <div className="w-[120px] h-[28px] bg-_small-gray bg-opacity-20 rounded-md"></div>
      </div>
      <div className="border-gray-700 border-2  rounded-2xl p-4 mb-4 border-_gray">
        <div className="mb-1 font-semibold">
          <div className="w-[80px] h-[20px] bg-_small-gray bg-opacity-20 rounded-md mb-3"></div>
        </div>
        <div className="text-xs mb-3">
          <div className="w-[30px] h-[15px] bg-_small-gray bg-opacity-20 rounded-md mb-3"></div>
        </div>
        <div className="text-xs">
          <div className="w-[50px] h-[15px] bg-_small-gray bg-opacity-20 rounded-md "></div>
        </div>
      </div>
    </div>
  );
}

export default function QuizSetsSkeleton() {
  return (
    <div className="animate-pulse">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
