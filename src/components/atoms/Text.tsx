interface ITextProps {
	textAlign?: "text-left" | "text-center" | "text-right" | "text-justify";
	fontWeight?:
		| "font-thin"
		| "font-normal"
		| "font-semibold"
		| "font-extrabold";
}

export default function Text({ textAlign, fontWeight }: ITextProps) {
	<span className={`${textAlign} ${fontWeight}`}></span>;
}
