import "./App.css";

import DashBoard from "./components/dashboard";
import Student from "./components/student/list";
import Attend from "./components/attend";
import Quiz from "./components/quiz";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClassCreate from "./components/class/create";
import ClassInvite from "./components/class/invite";
import ClassHome from "./components/class/home";
import StudentInfo from "./components/student/info";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DashBoard />} />
				<Route path="/class" element={<ClassHome />} />
				<Route path="/class/create" element={<ClassCreate />} />
				<Route path="/class/invite" element={<ClassInvite />} />
				<Route path="/student" element={<Student />} />
				<Route path="/student/:id" element={<StudentInfo />} />
				<Route path="/attend" element={<Attend />} />
				<Route path="/quiz" element={<Quiz />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
