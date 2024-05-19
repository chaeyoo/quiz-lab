interface ICard {
	title: string;
	content: string;
	height: string;
	width: string;
}
export default function Card(props: ICard) {
	const { title, content, height, width } = props;
	return (
		<div
			className={`flex flex-col rounded-lg border-2 border-opacity-60 border-gray-200 ${height} md:w-1/2 m-1 min-w-min`}
		>
			<div className="bg-gray-200 py-1 px-3 text-sm font-semibold text-gray-700">
				{title}
			</div>
			<div className="py-1 px-3 text-sm overflow-y-scroll">{content}</div>
		</div>
	);
}
