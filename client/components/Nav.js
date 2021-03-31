import { Box, Flex, Heading, Spacer, Text, Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";

const HoverBox = styled(Box)`
  font-size: 2rem;
  color: rgb(59, 130, 246);
  margin: 0;
  padding: 0;
  a {
    padding: 2.3rem 1.5rem;
    position: relative;
    &:before {
      content: "";
      width: 3px;
      background: rgb(37, 99, 235);
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 3px;
      background: rgb(59, 130, 246);
      content: "";
      width: 0%;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2.7rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
    @media (max-width: 789px) {
      font-size: 1rem;
      padding: 0.5rem 1rem;
      &:before {
        height: 0%;
      }
    }
  }
`;

const Nav = () => {
  return (
    <Box borderBottom="4px" borderBottomColor="blue.600">
      <Flex
        as="nav"
        w={{ base: "75%", md: "90%" }}
        mx="auto"
        align="center"
        direction={{ base: "column", md: "row" }}
        py={6}
      >
        <Heading fontSize="5xl" color="blue.500">
          <Link href="/">Gönner Shop</Link>
        </Heading>
        <Spacer />
        <HoverBox>
          <Link href="/">Produkte</Link>
          <Link href="/sell">Verkaufen</Link>
          {/* <Link href="/login">Login</Link> */}
        </HoverBox>
      </Flex>
    </Box>
  );
};

export default Nav;
