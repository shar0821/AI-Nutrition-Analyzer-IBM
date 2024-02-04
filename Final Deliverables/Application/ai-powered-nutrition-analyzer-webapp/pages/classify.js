import Head from "next/head";
import axios from "axios";

import {
	ChakraProvider,
	Heading,
	Flex,
	IconButton,
	HStack,
	VStack,
	StackDivider,
	TableContainer,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Text,
} from "@chakra-ui/react";

import Nav from "../components/Nav";
import UploadAndDisplayImage from "../components/UploadAndDisplayImage";

import { useRef, useState } from "react";

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
	const [selectedImage, setSelectedImage] = useState(null);
	const [ans, setAns] = useState("");
	const [fruit, setFruit] = useState("");

	const sendDataToParent = (image) => {
		// console.log(image);
		setSelectedImage(image);
	};

	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	async function sendFileToBackend() {
		console.log("TEST...");
		setFruit("Loading...");

		var imgData = "";
		var bodyFormData = new FormData();

		try {
			imgData = await toBase64(selectedImage);
		} catch (error) {
			console.error(error);
		}
		console.log("Img data");
		console.log(imgData);

		// console.log("img data type: ");
		// console.log(typeof imgData);

		bodyFormData.append("imageString", imgData);

		const headers = {
			"Content-Type": "multipart/form-data",
			"Access-Control-Allow-Origin": "*",
		};

		axios
			.post("http://localhost:5000/api/classify", bodyFormData, {
				headers: headers,
			})
			.then((response) => {
				console.log(response);
				setFruit(response.data.fruit);
				// console.log(response.data.listItems.items);
				console.log("Response data list items");
				var temp = JSON.parse(response.data.listItems).items[0];
				setAns(temp);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<ChakraProvider>
			<div>
				<Head>
					<title>APNA - Classify</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Nav NAV_ITEMS={navItems} />
				<Flex height="30vh" alignItems="center" justifyContent="center">
					<Heading as="h1" size="4xl" noOfLines={1} textColor="green.400">
						Classify
					</Heading>
				</Flex>
				<HStack spacing={8}>
					<Flex height="50vh" width="100em" justifyContent="center">
						<UploadAndDisplayImage
							sendDataToParent={sendDataToParent}
							sendFileToBackend={sendFileToBackend}
						/>
					</Flex>
					<Flex height="50vh" width="100em" justifyContent="center">
						<Flex height="100vh" justifyContent="center">
							<TableContainer>
								<Table variant="striped" colorScheme="green">
									<TableCaption>Nutrient Statistics</TableCaption>
									<Thead>
										<Tr>
											<Th>Nutrient</Th>
											<Th>Quantity</Th>
										</Tr>
									</Thead>
									<Tbody>
										<Tr>
											<Td>Fruit</Td>
											<Td>{fruit}</Td>
										</Tr>
										<Tr>
											<Td>Sugar (g)</Td>
											<Td>{ans["sugar_g"]}</Td>
										</Tr>
										<Tr>
											<Td>Fiber (g)</Td>
											<Td>{ans["fiber_g"]}</Td>
										</Tr>
										<Tr>
											<Td>Serving Size (g)</Td>
											<Td>{ans["serving_size_g"]}</Td>
										</Tr>
										<Tr>
											<Td>Sodium (mg)</Td>
											<Td>{ans["sodium_mg"]}</Td>
										</Tr>
										<Tr>
											<Td>Potassium (mg)</Td>
											<Td>{ans["potassium_mg"]}</Td>
										</Tr>
										<Tr>
											<Td>Fat Saturated (mg)</Td>
											<Td>{ans["fat_saturated_g"]}</Td>
										</Tr>
										<Tr>
											<Td>Fat Total (g)</Td>
											<Td>{ans["fat_total_g"]}</Td>
										</Tr>
										<Tr>
											<Td>Calories</Td>
											<Td>{ans["calories"]}</Td>
										</Tr>
										<Tr>
											<Td>Cholesterol (mg)</Td>
											<Td>{ans["cholesterol_mg"]}</Td>
										</Tr>
										<Tr>
											<Td>Protein (g)</Td>
											<Td>{ans["protein_g"]}</Td>
										</Tr>
										<Tr>
											<Td>Total Carbohydrates (g)</Td>
											<Td>{ans["carbohydrates_total_g"]}</Td>
										</Tr>
									</Tbody>
								</Table>
							</TableContainer>
						</Flex>
					</Flex>
				</HStack>
			</div>
		</ChakraProvider>
	);
}
