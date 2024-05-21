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
					className="w-20 min-h-7 bg-slate-100 border-2 border-gray-100 border-opacity-70"
				/>
				<button
					type="button"
					className=" min-h-7 bg-green-600 text-xs px-1 rounded-sm"
				>
					입력
				</button>
			</div>
		</div>
	);
}
