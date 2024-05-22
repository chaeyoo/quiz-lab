interface IGradeItem {
	exam: string;
}

export default function GradeItem(props: IGradeItem) {
	const { exam } = props;
	return (
		<div className="flex flex-col items-center">
			<div className="text-xs font-bold mb-1">{exam}</div>
			<div className="flex items-center">
				<input
					type="number"
					className="w-20 min-h-7 bg-slate-100 border-2 border-gray-100 border-opacity-70 px-3 rounded-l-md"
				/>
				<button
					type="button"
					className=" min-h-7 bg-green-900 bg-opacity-80 text-yellow-100 text-xs px-2 rounded-r-md"
				>
					입력
				</button>
			</div>
		</div>
	);
}
