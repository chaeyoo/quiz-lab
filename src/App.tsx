import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizSet from "./components/quiz-set/QuizSet";
import QuizSetList from "./components/quiz-set-list/QuizSetList";
import { quizSets } from "./mock/data";
let qiuzSet = quizSets[0];
const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<QuizSetList />} />
				<Route path="/quiz/:id" element={<QuizSet quizSet={qiuzSet} />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
