import Head from "next/head";

import { ChakraProvider, Flex } from "@chakra-ui/react";

import { useRouter } from "next/router";

import Nav from "../components/Nav";

const navItems = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Classify",
		href: "/classify",
	},
	{
		label: "About",
		children: [
			{
				label: "About the WebApp",
				// subLabel: "Find your dream design job",
				href: "/about-webapp",
			},
			{
				label: "About the Team",
				// subLabel: "An exclusive list for contract work",
				href: "/about-team",
			},
		],
	},
];

export default function Home() {
	const { asPath } = useRouter();

	return (
		<ChakraProvider>
			<div>
				<Head>
					<title>APNA - About Team</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Nav NAV_ITEMS={navItems} />
				<Flex height="30vh" alignItems="center" justifyContent="center">
					ABOUT TEAM
				</Flex>
				<Flex height="60vh" justifyContent="center">
					Sharvesh Shankar, Sushaanth Srinivasan, Sandeep Sekhar, Rahul Kumar
				</Flex>
			</div>
		</ChakraProvider>
	);
}
