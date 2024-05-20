interface ICard {
	title: React.ReactNode;
	content: string;
	height: string;
	width: string;
}
export default function Card(props: ICard) {
	const { title, content, height, width } = props;
	return (
		<div
			className={`flex flex-col rounded-lg border-4 border-opacity-60 border-green-800 ${height} md:w-1/2 m-1 min-w-min`}
		>
			<div className="bg-gray-100 py-2 px-4 text-sm font-semibold text-gray-700 rounded-md">
				{title}
			</div>
			<div className="py-1 px-3 text-sm overflow-y-scroll">{content}</div>
		</div>
	);
}
