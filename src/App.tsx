import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizSet from "./components/quiz-set";
import QuizSetList from "./components/quiz-set-list";
import TestComponent from "./components/__test";
import QuizWordCard from "./components/word-card";
import CardResult from "./components/result/result";
import QuizExam from "./components/exam";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizSetList />} />
        <Route path="/:id" element={<QuizSet />} />
        <Route path="/:id/card" element={<QuizWordCard />} />
        <Route path="/card/result" element={<CardResult />} />
        <Route path="/:id/exam" element={<QuizExam />} />
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
