import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizSet from "./components/quiz-set";
import QuizSetList from "./components/quiz-set-list";
import TestComponent from "./components/test";
const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<QuizSetList />} />
				<Route path="/:id" element={<QuizSet />} />
				<Route path="/test" element={<TestComponent />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
