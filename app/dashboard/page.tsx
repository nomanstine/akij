import {SearchBar, TestCard, Pagination} from "@/components/dashboard";
import {tests} from "@/mockdata/data";

export default function DashboardPage() {
	return (
		<div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-5 px-4 py-10 sm:px-6 lg:px-8">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<h1 className="text-[24px] leading-[130%] font-semibold text-slate-700">Online Tests</h1>
				<SearchBar />
			</div>

			<section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				{tests.map((test) => (
					<TestCard key={test.id} {...test} />
				))}
			</section>

			<Pagination />
		</div>
	);
}
