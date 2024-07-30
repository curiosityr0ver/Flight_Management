import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	Link,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, register } from "../api/User";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const toast = useToast();

	useEffect(() => {
		const path = window.location.pathname;
		setIsLogin(path === "/login");

		// Check for email and password in location state
		if (location.state && location.state.email && location.state.password) {
			setEmail(location.state.email);
			setPassword(location.state.password);
		}
	}, [location]);

	const toggleView = () => {
		const newPath = isLogin ? "/register" : "/login";
		navigate(newPath);
		setIsLogin(!isLogin);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (isLogin) {
				// Login logic
				const response = await login({ email, password });
				localStorage.setItem("token", response.token); // Assuming the API returns a token
				toast({
					title: "Login successful",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				navigate("/flights"); // Redirect to dashboard or home page
			} else {
				// Register logic
				await register({ email, password, phone });
				toast({
					title: "Registration successful",
					description: "Please login with your new account.",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
				navigate("/login", { state: { email, password } });
			}
		} catch (error) {
			toast({
				title: "An error occurred",
				description: error.message || "Please try again.",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>{isLogin ? "Login" : "Register"}</Heading>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<form onSubmit={handleSubmit}>
						<Stack spacing={4}>
							<FormControl id="email">
								<FormLabel>Email address</FormLabel>
								<Input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</FormControl>
							<FormControl id="password">
								<FormLabel>Password</FormLabel>
								<Input
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</FormControl>
							{!isLogin && (
								<FormControl id="phone">
									<FormLabel>Phone</FormLabel>
									<Input
										type="tel"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										required
									/>
								</FormControl>
							)}
							<Button
								type="submit"
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								isLoading={isLoading}
							>
								{isLogin ? "Sign in" : "Sign up"}
							</Button>
							<Text align={"center"}>
								{isLogin
									? "Don't have an account?"
									: "Already have an account?"}{" "}
								<Link color={"blue.400"} onClick={toggleView}>
									{isLogin ? "Sign up" : "Login"}
								</Link>
							</Text>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};

export default AuthPage;
