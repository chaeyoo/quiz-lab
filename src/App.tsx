import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizSet from "./components/QuizSet";
import QuizSetList from "./components/quizSets/QuizSetList";
import { quizSets } from "./mock/data";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<QuizSetList quizSets={quizSets} />} />
				<Route path="/quiz/:id" element={<QuizSet />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
