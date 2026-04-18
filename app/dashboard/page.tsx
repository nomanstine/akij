"use client";

import { useEffect } from "react";
import { Pagination, SearchBar, TestCard } from "@/components/dashboard";
import api from "@/lib/api";
import { useDashboardStore } from "@/store/dashboardStore";

export default function DashboardPage() {
	const { tests, setTests, isLoading, setIsLoading } = useDashboardStore();

	useEffect(() => {
		const fetchTests = async () => {
			try {
				const response = await api.get('/tests');
				setTests(response.data);
			} catch (error) {
				console.error("Failed to fetch tests:", error);
			} finally {
				setIsLoading(false);
			}
		};
		
		fetchTests();
	}, []);

	if (isLoading) {
		return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
	}

	return (
		<main className="container mx-auto flex flex-1 flex-col gap-5 px-4 py-10 sm:px-6 lg:px-8">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<h1 className="text-2xl font-semibold text-slate-700">Online Tests</h1>
				<SearchBar />
			</div>

			<section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				{tests.map((test) => (
					<TestCard key={test.id} {...test} />
				))}
			</section>

			<Pagination />
		</main>
	);
}
