import { act } from "@testing-library/react";
import { create as actualCreate, StateCreator } from "zustand";

const storeResetFns = new Set<() => void>();

export const create = <T extends object>(createState: StateCreator<T>) => {
	const store = actualCreate(createState);
	const initialState = store.getState();
	storeResetFns.add(() => store.setState(initialState, true));
	return store;
};

afterEach(() => {
	act(() => {
		storeResetFns.forEach((resetFn) => resetFn());
	});
});
