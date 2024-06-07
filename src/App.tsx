import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizSetList from "./components/QuizSetList";
import QuizSet from "./components/QuizSet";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<QuizSetList />} />
				<Route path="/quiz/:id" element={<QuizSet />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
