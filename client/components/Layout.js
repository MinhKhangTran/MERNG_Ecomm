import { Box } from "@chakra-ui/layout";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <Box>
      <Nav></Nav>
      <Box w={{ base: "75%", md: "90%" }} mx="auto">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
