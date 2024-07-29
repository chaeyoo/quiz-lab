import { useNavigate } from "react-router-dom";
import useQuizSetList from "../../hooks/useQuizSetList";
import { IQuizSet } from "../../types/quiz";

export default function List({ query = "" }: { query: string }) {
  const { data, isLoading, error } = useQuizSetList(query);
  type GroupedQuizSets = { [key: string]: IQuizSet[] };

  function groupQuizSetsByDate(quizSets: IQuizSet[]): {
    [key: string]: IQuizSet[];
  } {
    return quizSets.reduce((acc, quizSet) => {
      const date = new Date(quizSet.created_at);
      const yearMonth = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(quizSet);

      return acc;
    }, {} as { [key: string]: IQuizSet[] });
  }

  function setQuizSetList(data: IQuizSet[]) {
    const grouped: GroupedQuizSets = groupQuizSetsByDate(data);
    const sortedYearMonth = Object.keys(grouped).sort((a, b) => {
      const [aYear, aMonth] = a.split("년 ").map(Number);
      const [bYear, bMonth] = b.split("년 ").map(Number);
      return bYear - aYear || bMonth - aMonth;
    });
    return { sortedYearMonth, grouped };
  }
  const navigate = useNavigate();
  if (data == null) {
    return null;
  }
  const { sortedYearMonth, grouped } = setQuizSetList(data);

  return (
    <div>
      {sortedYearMonth?.map((group, idx) => (
        <div key={idx} className="mb-10">
          <div className=" font-semibold mb-4">{group}에 만듦</div>
          <div>
            {grouped &&
              grouped[group].map((quizSet, idx) => (
                <div
                  key={idx}
                  className="border-gray-700 border-2  rounded-2xl p-4 mb-4 border-_gray"
                  onClick={() => {
                    navigate(`/${quizSet.id}`);
                  }}
                >
                  <div className="mb-1 font-semibold">{quizSet.name}</div>
                  <div className="text-xs mb-3">
                    {quizSet.quiz ? quizSet.quiz.length : 0} 단어
                  </div>
                  <div className="text-xs">{quizSet.user.nick_name}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
