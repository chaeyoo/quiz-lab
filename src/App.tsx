import "./App.css";

import DashBoard from "./components/dashboard";
import Class from "./components/class";
import Student from "./components/student";
import Attend from "./components/attend";
import Quiz from "./components/quiz";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DashBoard />} />
				<Route path="/class" element={<Class />} />
				<Route path="/student" element={<Student />} />
				<Route path="/attend" element={<Attend />} />
				<Route path="/quiz" element={<Quiz />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
