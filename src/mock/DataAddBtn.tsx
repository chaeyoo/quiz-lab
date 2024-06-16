import { collection, doc, writeBatch } from "firebase/firestore";
import { store } from "../remote/firebase";

export default function DataAddButton() {
	const handleButtonClick = async () => {
		const batch = writeBatch(store);
		const data: any[] = [];
		for (let i = 1; i <= 300; i++) {
			let quizes = [];
			for (let j = 1; j <= 30; j++) {
				quizes.push({
					word: `단어${j}`,
					mean: `뜻${j}`,
					seq: j,
				});
			}
			data.push({
				id: i,
				name: `퀴즈세트${i}`,
				length: 30,
				author: `author${i}`,
				creatdAt: "2024-08-10",
				quizes: quizes,
			});
		}
		data.forEach((product: any) => {
			const productDocRef = doc(collection(store, "QUIZ"));
			batch.set(productDocRef, product);
		});
		batch.commit();

		alert("데이터 추가완료!");
	};
	return (
		<>
			<button onClick={handleButtonClick}>추가</button>
		</>
	);
}
