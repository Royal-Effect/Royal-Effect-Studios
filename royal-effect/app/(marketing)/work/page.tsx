import { Metadata } from "next";
import { WorkIndexSection } from "@/components/web/sections/work/WorkIndexSection";
import { WorkGallerySection } from "@/components/web/sections/work/WorkGallerySection";
// import { WorkServicesSection } from "@/components/web/sections/work/WorkServicesSection";
// import { WorkClientsSection } from "@/components/web/sections/work/WorkClientsSection";
// import { WorkCTASection } from "@/components/web/sections/work/WorkCTASection";
import { client } from "@/sanity/lib/client";
import { selectedWorksQuery } from "@/sanity/lib/queries";
import { selectedWorkData } from "@/libs/constants/selectedWorkData";
import { SelectedWorkInterface } from "@/libs/interfaces/selectedWork";

export const revalidate = 60;

export const metadata: Metadata = {
	title: "Royal Effect Studios - Work",
	description:
		"Selected brand identity, logo, and web projects from Royal Effect Studios.",
};

export default async function WorkPage() {
	// Fetch from Sanity API, fallback to static data if empty
	const sanityWorks = await client.fetch<SelectedWorkInterface[]>(selectedWorksQuery);
	const worksToDisplay = sanityWorks.length > 0 ? sanityWorks : selectedWorkData;

	return (
		<main>
			<WorkIndexSection />
			<WorkGallerySection projects={worksToDisplay} />
			{/* <WorkServicesSection /> */}
			{/* <WorkClientsSection /> */}
			{/* <WorkCTASection /> */}
		</main>
	);
}
