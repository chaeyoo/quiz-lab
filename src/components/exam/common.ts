export const getRandomEls = (arr: string[], num: number, except: string) => {
	const filteredArray = arr.filter((el) => el !== except);
	if (filteredArray.length < num) {
		throw new Error("배열의 요소 수가 요청된 요소 수보다 적습니다.");
	}

	const shuffledArray = [...filteredArray];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	return shuffledArray.slice(0, num);
};

export const shuffleArray = (arr: string[]): string[] => {
	const shuffledArray = [...arr];

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	return shuffledArray;
};
