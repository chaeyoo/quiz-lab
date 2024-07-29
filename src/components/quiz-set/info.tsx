import { MdCastForEducation } from "react-icons/md";
import useQuizSet from "../../hooks/useQuizSet";
import { IoPencilOutline } from "react-icons/io5";
import { IQuizSet } from "../../types/quiz";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import NoDataInteractive from "../no-data";

export default function QuizSetInfo({ id }: { id: number }) {
  const navigate = useNavigate();
  const { data } = useQuizSet(id);
  if (data == null) {
    return null;
  }
  const quizSet: IQuizSet = data[0];

  return (
    <>
      <div data-testid="header" className="flex flex-row justify-between mb-7">
        <FaArrowLeftLong
          size={25}
          data-testid="back-icon"
          onClick={() => {
            navigate(`/`);
          }}
        />
      </div>
      <div data-testId="intro">
        <div className="text-2xl font-semibold mb-5">{quizSet.name}</div>
        <div className="flex">
          <div className="mr-5 text-sm">{quizSet.user.nick_name}</div>
          <div>{"|"}</div>
          <div className="ml-5  text-sm">{quizSet.quiz?.length} 단어</div>
        </div>
      </div>

      <div className="mb-7" data-testid="quiz-study">
        <div className="bg-slate-700 p-5 my-3 rounded-xl flex  bg-_medium-gray items-center">
          <MdCastForEducation className="mr-3 text-_purple" />
          낱말카드
        </div>

        <div className="bg-slate-700 p-5 my-3 rounded-xl flex  bg-_medium-gray  items-center">
          <IoPencilOutline className="mr-3 text-_purple" />
          학습하기
        </div>
      </div>
      <div data-testid="word-list">
        <div className="mb-3 text-sm font-semibold">단어</div>
        <div>
          {quizSet.quiz &&
            quizSet.quiz.length > 0 &&
            quizSet.quiz?.map((quiz) => (
              <div
                key={quiz.seq}
                className="bg-_medium-gray p-5 my-3 rounded-xl"
              >
                <div className="flex justify-between">
                  <div className="mb-3 text-lg font-semibold">{quiz.word}</div>
                </div>
                <div>{quiz.meaning}</div>
              </div>
            ))}
          {quizSet.quiz && quizSet.quiz.length === 0 && (
            <div>
              <NoDataInteractive />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
