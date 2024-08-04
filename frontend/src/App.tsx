import * as React from "react";
import {
    ChakraProvider,
    Box,
    Flex,
    VStack,
    Icon,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Text,
    useToast,
    useToken,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Button,
    CircularProgress,
} from "@chakra-ui/react";
import { AddIcon, ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
    NavLink,
    useNavigate,
} from "react-router-dom";

const SideNavigation = () => {
    return (
        <VStack as="nav" align="stretch" p="4" spacing="4">
            <LinkBox icon={AddIcon} label="Posts" to="/" />
            <LinkBox
                icon={ExternalLinkIcon}
                label="Logistics"
                to="/discussions"
            />
            <LinkBox icon={RepeatIcon} label="Quiz" to="/quiz" />
        </VStack>
    );
};

const LinkBox = ({
    icon,
    label,
    to,
}: {
    icon: React.ElementType;
    label: string;
    to: string;
}) => {
    const location = useLocation();

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        // Prevent navigating to the same path
        if (location.pathname === to) {
            event.preventDefault();
        }
    };

    // Retrieve the Chakra UI token values
    const [activeBg, inactiveBg] = useToken("colors", [
        "blue.900",
        "transparent",
    ]);
    const borderRadius = useToken("radii", ["md"]); // Using 'md' as an example

    return (
        <NavLink
            to={to}
            onClick={handleClick}
            style={({ isActive }) => ({
                textDecoration: "none",
                backgroundColor: isActive ? activeBg : inactiveBg,
                color: isActive ? "#3182ce" : "inherit", // Adjust colors as needed
                borderRadius: isActive ? borderRadius[0] : "0", // Fix: Use borderRadius[0] to ensure a single string value
            })}
        >
            <Flex
                align="center"
                p="2"
                borderRadius="md"
                _hover={{ bg: "gray.400" }}
                sx={{
                    transition: "all 0.2s", // Smooth transition for background color
                }}
            >
                <Icon as={icon} w={6} h={6} mr="4" />
                <Text color="inherit">{label}</Text>
            </Flex>
        </NavLink>
    );
};

const MobileSidebar = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    return (
        <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                <DrawerBody>
                    <SideNavigation />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

const Sidebar = () => {
    return (
        <Box
            as="aside"
            w="64"
            h="100vh"
            role="navigation"
            bg="blue.800"
            color="white"
            p="4"
        >
            <Flex align="center" h="20" px="4" borderBottomWidth="1px">
                {/* <Image
                    src="./assets/react.svg"
                    alt="Workflow"
                    boxSize="8"
                    mr="2"
                /> */}
                <Text fontSize="xl" fontWeight="bold">
                    Smart Notes
                </Text>
            </Flex>
            <SideNavigation />
        </Box>
    );
};

const MainContent = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = React.useState(false);
    const location = useLocation(); // This hook returns the current location object

    React.useEffect(() => {
        const handleRouteChange = () => {
            setLoading(true);
            // simulate a loading phase
            setTimeout(() => setLoading(false), 500); // Simulate fetching data
        };

        handleRouteChange();
        // Add location.pathname to the dependency array to trigger effect on path change
    }, [location.pathname]);

    return (
        <Box as="main" p="4" overflowY="auto" flex="1">
            {loading ? (
                <Flex height="100%" align="center" justify="center">
                    <CircularProgress
                        size="100"
                        thickness={6}
                        isIndeterminate
                        color="blue.500"
                    />
                </Flex>
            ) : (
                children
            )}
        </Box>
    );
};

const FixedHeader = () => {
    return (
        <Flex
            as="header"
            align="center"
            justify="center"
            p="4"
            bg="white"
            color="blue.800"
            // position="fixed"
            fontWeight="bold"
            top="0"
            left="64"
            right="0"
            zIndex="banner"
            h="100"
        >
            <Text>Search Tool Placeholder</Text>
        </Flex>
    );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const toast = useToast();
    const location = useLocation();

    React.useEffect(() => {
        // Function to map pathnames to user-friendly names
        const getPageName = (pathname: string) => {
            const pageNames: { [key: string]: string } = {
                "/": "Dashboard",
                "/discussions": "Discussions",
                "/quiz": "Quiz",
            };
            return pageNames[pathname] || "Page";
        };

        // Display a toast message whenever the route changes
        toast({
            title: `You have navigated to ${getPageName(location.pathname)}.`,
            description:
                "You are viewing the " +
                getPageName(location.pathname) +
                " page.",
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "top-right",
        });
    }, [location, toast]);

    return (
        <Flex h="100vh" overflow="hidden" bg="gray.100">
            <Sidebar />
            <Flex direction="column" flex="1" overflow="auto">
                <FixedHeader />
                <MainContent>{children}</MainContent>
            </Flex>
        </Flex>
    );
};

const PlaceholderCard = () => {
    return (
        <Box
            width="80%"
            height="50px"
            bg="gray.200" // Light grey background for the placeholder
            borderRadius="md" // Optional: rounded corners
            mx="auto" // Center the card
            my={2} // Margin top and bottom for spacing
        />
    );
};

const Dashboard = () => {
    const navigate = useNavigate();
    const accordionSections = [
        {
            title: "Section 1 title",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            title: "Section 2 title",
            content:
                "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        },
        {
            title: "Section 3 title",
            content:
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        },
    ];
    return (
        <VStack>
            <Button colorScheme="blue">Retrieve Posts</Button>
            <Accordion allowToggle allowMultiple width="80%">
                {accordionSections.map((section, index) => (
                    <AccordionItem key={index}>
                        <h2>
                            <AccordionButton height="100">
                                <Box flex="1" textAlign="left">
                                    {section.title}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Flex justifyContent="space-evenly" mt={4}>
                                <Button colorScheme="blue">See Post</Button>
                                <Button
                                    colorScheme="green"
                                    onClick={() => navigate("/quiz")}
                                >
                                    Start Quiz
                                </Button>
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </VStack>
    );
};

const Discussions = () => {
    return (
        <VStack spacing={4}>
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
        </VStack>
    );
};

const Projects = () => {
    return (
        <VStack>
            <PlaceholderCard />
            <PlaceholderCard />
        </VStack>
    );
};

function App() {
    React.useEffect(() => {
        // Disable scrolling
        document.body.style.overflow = "hidden";

        return () => {
            // Re-enable scrolling when the component unmounts
            document.body.style.overflow = "auto";
        };
    }, []);
    return (
        <ChakraProvider>
            <Router>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/discussions" element={<Discussions />} />
                        <Route path="/quiz" element={<Projects />} />
                    </Routes>
                </MainLayout>
            </Router>
        </ChakraProvider>
    );
}

export default App;
