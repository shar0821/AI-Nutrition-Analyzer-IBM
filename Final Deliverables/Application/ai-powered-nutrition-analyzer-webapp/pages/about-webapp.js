import Head from "next/head";

import { ChakraProvider, Flex, Heading, Text, VStack } from "@chakra-ui/react";

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
					<title>APNA - About Webapp</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Nav NAV_ITEMS={navItems} />
				<Flex height="30vh" alignItems="center" justifyContent="center">
					<Heading as="h1" size="4xl" noOfLines={1} textColor="green.400">
						About
					</Heading>
				</Flex>
				<Flex height="60vh" justifyContent="center">
					<VStack spacing={4}>
						<Text fontSize="xl">
							This application allows you to upload images of fruits and
							vegetables. <br />
							It identifies the fruit/vegetable and also provides nutritional
							statistics in order to help you plan out your diet.
						</Text>

						<Text fontSize="xl">
							The problem of inaccessible diet plans in the palm of your hand
							affects fitness enthusiasts, individuals who follow diets, and
							<br />
							people who cannot go to the gym or follow a costly diet. If fixed,
							many more people need not rely on gyms for fitness and dieting.
							Even
							<br />
							though diet plans can be contrained by culture and religion of
							different people in food products like meat, easy access to
							<br />
							nutritional information would atleast spread awareness amongst
							people. Moreover, one of the major issues for people is the easy
							<br />
							access to this kind of information. Hence, the implementation of
							this app would revolutionise the fitness and health industry and
							<br />
							enable more people to be healthy and fit. Stakeholders such as
							investors and developers will receive recognition and profit for
							<br />
							helping raise community awareness about health and users will
							become more healthy.
							<br />
						</Text>
					</VStack>
				</Flex>
			</div>
		</ChakraProvider>
	);
}
