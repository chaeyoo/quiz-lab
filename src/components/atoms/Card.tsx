interface ICard {
	title: string;
	content: string;
}
export default function Card(props: ICard) {
	const { title, content } = props;
	return (
		<div className="flex flex-col rounded-lg border-2 border-opacity-60 border-gray-200">
			<div className="bg-gray-200 py-1 px-3 text-sm font-semibold text-gray-700">
				{title}
			</div>
			<div className="py-1 px-3 text-sm">{content}</div>
		</div>
	);
}
