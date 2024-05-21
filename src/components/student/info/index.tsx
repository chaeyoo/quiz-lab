import { FaRegEdit } from "react-icons/fa";
import Card from "../../atoms/Card";
import { Input } from "../../atoms/input";
import ClassLayout from "../../class/home/layout";
import GradeItem from "./GradeItem";
import { useState } from "react";

export default function StudentInfo() {
	const examArr = [
		"1학기 중간고사",
		"1학기 기말고사",
		"2학기 중간고사",
		"2학기  기말고사",
	];
	return (
		<ClassLayout>
			<div className="flex flex-col flex-wrap md:flex-row h-full md:items-start">
				<div className="md:w-64 flex-shrink-0 py-1 mb-3 md:mb-0">
					<div className="border-2 border-gray-200 rounded-lg ">
						<div className="font-bold px-3 py-2">
							{"{학생이름}"}
						</div>
						<div className="text-sm p-3">
							<p className="text-xs">광영여고 1학년</p>
							<p>이번 달 결석 #회</p>
							<p>이번주 퀴즈 ##점</p>
							<p>부모님 연락처 010-9999-9999</p>
						</div>
					</div>

					<button
						type="submit"
						className="w-full bg-green-600 hover:bg-green-700 text-white  font-medium py-2 px-4 text-xs rounded mt-1"
					>
						클래스에서 삭제
					</button>
				</div>

				<div className="flex flex-col  flex-grow md:w-96 rounded-lg py-1 md:ml-2">
					<div className="h-56 bg-slate-100 bg-opacity-75 mb-3">
						점수 차트
					</div>
					<div className="md:flex hidden flex-col py-3 md:flex-row mb-3 md:justify-around w-full">
						{examArr.map((v, idx) => (
							<GradeItem key={idx} exam={v} />
						))}
					</div>
					<div className="h-56  w-full">
						<Card
							title={
								<div className="flex justify-between">
									<div>메모</div>
									<FaRegEdit className="hover:text-green-700" />
								</div>
							}
							content=""
							height="h-full"
							width="w-full"
						/>
					</div>
				</div>
			</div>
		</ClassLayout>
	);
}
