import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizSet from "./components/quiz-set";
import QuizSetList from "./components/quiz-set-list";
const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<QuizSetList />} />
				<Route path="/:id" element={<QuizSet />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
