import { Metadata } from "next";
import { notFound } from "next/navigation";
import { selectedWorkData } from "@/libs/constants/selectedWorkData";
import { WorkCaseStudySection } from "@/components/web/sections/work/WorkCaseStudySection";
import { client } from "@/sanity/lib/client";
import { singleWorkQuery, workSlugsQuery } from "@/sanity/lib/queries";
import { SelectedWorkInterface } from "@/libs/interfaces/selectedWork";

type WorkSlugPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export const revalidate = 60;


export async function generateStaticParams() {
	const sanitySlugs = await client.fetch<string[]>(workSlugsQuery);
	const slugsToUse = sanitySlugs.length > 0 ? sanitySlugs : selectedWorkData.map(p => p.slug);
	return slugsToUse.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkSlugPageProps): Promise<Metadata> {
	const { slug } = await params;
	const sanityProject = await client.fetch<SelectedWorkInterface | null>(singleWorkQuery, { slug });
	const project = sanityProject || selectedWorkData.find((entry) => entry.slug === slug);

	if (!project) {
		return {
			title: "Royal Effect Studios - Work",
		};
	}

	return {
		title: `Royal Effect Studios - ${project.client}`,
		description: project.summary,
	};
}

export default async function WorkSlugPage({ params }: WorkSlugPageProps) {
	const { slug } = await params;
	const sanityProject = await client.fetch<SelectedWorkInterface | null>(singleWorkQuery, { slug });
	const project = sanityProject || selectedWorkData.find((entry) => entry.slug === slug);

	if (!project) {
		notFound();
	}

	return <WorkCaseStudySection project={project} />;
}
