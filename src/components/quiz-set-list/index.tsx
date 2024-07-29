import { Suspense, useState } from "react";
import { convertStr } from "../../lib/convertStr";
import { debounce } from "../../lib/debounce";
import List from "./list";
import QuizSetsSkeleton from "./skeleton";

export default function QuizSetList() {
  const [keyword, setKeyword] = useState<string>("");
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(convertStr(e.target.value));
  };

  const handleChangeKeyWord = debounce<typeof onChange>(onChange, 700);
  return (
    <div className="mx-5 my-10 min-w-[300px]">
      <h1 className="text-4xl font-extrabold mb-7 ">Quizlab</h1>
      <div>
        <input
          className="w-full bg-inherit mb-5 p-2 border-b-_light-gray border-b-2 focus:border-b-4 focus:outline-none bg-_navy placeholder:text-_small-gray"
          placeholder="세트 필터링"
          onChange={handleChangeKeyWord}
        />
      </div>
      <Suspense fallback={<QuizSetsSkeleton />}>
        <List query={keyword} />
      </Suspense>
    </div>
  );
}
