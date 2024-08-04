import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const ErrorMessage = () => {
	const navigate = useNavigate();
	const bounceProps = useSpring({
		to: { transform: "translateY(5px)" },
		from: { transform: "translateY(-10px)" },
		config: { tension: 180, friction: 12 },
		loop: { reverse: true },
	});

	return (
		<div className="flex flex-col items-center justify-center h-screen p-6">
			<animated.div style={bounceProps} className="mb-4">
				<svg
					width="100"
					height="100"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="text-red-500"
				>
					<path d="M3 3h18v18H3V3zm2 2v14h14V5H5z" fill="currentColor" />
				</svg>
			</animated.div>
			<p className="text-xl font-bold text-_white">잘못된 접근입니다</p>
			<p className="text-_white mt-2 mb-16">
				페이지를 확인하거나 다시 시도해주세요.
			</p>
			<div
				className="bg-_purple rounded-md mx-5 text-center py-4 text-lg font-semibold w-[300px]"
				onClick={() => navigate("/")}
			>
				{`목록으로 가기`}
			</div>
		</div>
	);
};

export default ErrorMessage;
