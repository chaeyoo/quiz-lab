import { useState } from "react";
import Modal from "../atoms/Modal";
import ClassLayout from "../class/home/layout";

export default function Student() {
	const [modalOpen, setIsModalOpen] = useState<boolean>(false);
	const menu = ["학생목록", "Action", "초대목록", "내보내기"];
	let students = [
		{ id: 1, name: "채채루", email: "chae@test.com" },
		{ id: 1, name: "채채루", email: "chae@test.com" },
		{ id: 1, name: "채채루", email: "chae@test.com" },
		{ id: 1, name: "채채루", email: "chae@test.com" },
		{ id: 1, name: "채채루", email: "chae@test.com" },
		{ id: 1, name: "채채루", email: "chae@test.com" },
		{ id: 1, name: "채채루", email: "chae@test.com" },
		{ id: 1, name: "채채루", email: "chae@test.com" },
		{ id: 1, name: "채채루", email: "chae@test.com" },
		{ id: 1, name: "채채루", email: "chae@test.com" },
	];
	return (
		<ClassLayout>
			{modalOpen ? (
				<Modal open={modalOpen} toggle={setIsModalOpen} />
			) : null}
			<div className="flex flex-col md:flex-row h-full md:items-start">
				<div className="md:w-64 flex-shrink-0 border-2 border-gray-200 rounded-lg py-1 mb-3 md:mb-0">
					<div className="font-bold px-3 py-2">클래스 학생 관리</div>
					{menu.map((v, idx) => (
						<div
							key={idx}
							className="flex px-4 py-1.5 hover:bg-green-500 hover:bg-opacity-30 text-sm hover:border-l-4 hover:border-green-900"
						>
							{v}
						</div>
					))}
				</div>
				<button
					onClick={() => {
						setIsModalOpen(!modalOpen);
					}}
				>
					초대
				</button>
				<div className="flex flex-col  flex-grow md:w-64 border-2 border-gray-200 rounded-lg py-1 md:ml-2">
					<table
						className="min-w-full text-gray-900 md:table "
						style={{ height: "85vh" }}
					>
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th
									scope="col"
									className="px-4 py-5 font-bold sm:pl-6"
								>
									학생
								</th>
								<th scope="col" className="px-3 py-5 font-bold">
									Email
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{students?.map((invoice) => (
								<tr
									key={invoice.id}
									className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
								>
									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex items-center gap-3">
											<p>{invoice.name}</p>
										</div>
									</td>
									<td className="whitespace-nowrap px-3 py-3">
										{invoice.email}
									</td>

									<td className="whitespace-nowrap py-3 pl-6 pr-3">
										<div className="flex justify-end gap-3"></div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</ClassLayout>
	);
}
