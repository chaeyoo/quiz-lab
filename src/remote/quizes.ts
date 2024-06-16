import {
	collection,
	getDocs,
	QuerySnapshot,
	query,
	limit,
	startAfter,
} from "firebase/firestore";
import { store } from "./firebase";
import { IQuizSet } from "../types/quiz";

export async function getQuizSetList(
	pageParam?: QuerySnapshot<IQuizSet>
) {
	let productQuery;
	productQuery = !pageParam
		? query(collection(store, "QUIZ"), limit(10))
		: query(collection(store, "QUIZ"), startAfter(pageParam), limit(10));

	const productSnapshot = await getDocs(productQuery);

	const lastVisible = productSnapshot.docs[productSnapshot.docs.length - 1];
	const items = productSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return { items, lastVisible };
}
