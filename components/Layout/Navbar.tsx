import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import AuthenticationModal from "../AuthenticationModal";
import { useSession } from "../../utils/hooks";
import { auth } from "../../shared/auth/supabase";
import { authenticationModalState } from "../../shared/recoil/atoms";
import { useRecoilState } from "recoil";

import { GiTreeDoor } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";

const Links = [{ label: "Find workshops", href: "/workshops" }];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const session = useSession();

  const [authModalState, setAuthModalState] = useRecoilState(
    authenticationModalState
  );

  const isLanding = router.route === "/";

  return (
    <>
      <Box
        px={"4"}
        py="1"
        pos={isLanding ? "sticky" : "inherit"}
        top="0"
        zIndex={"overlay"}
        bg={isLanding ? "transparent" : "white"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack>
            <Box ml="4" mr="8" display={{ base: "none", sm: "flex" }}>
              <GiTreeDoor
                fontSize={"40px"}
                cursor="pointer"
                color={isLanding ? "white" : "black"}
                onClick={() => router.push("/")}
              />
            </Box>
          </HStack>

          <Flex alignItems={"center"}>
            {!session?.user && !isLanding ? (
              <Button
                variant={"text"}
                size={"sm"}
                color={isLanding ? "white" : "black"}
                onClick={() => setAuthModalState({ open: true, signUp: false })}
              >
                Log in
              </Button>
            ) : null}

            {!session?.user ? (
              <Button
                variant={"text"}
                size={"sm"}
                color={isLanding ? "white" : "black"}
                onClick={() => setAuthModalState({ open: true, signUp: true })}
              >
                Sign up
              </Button>
            ) : null}

            {session?.user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList border={"1px solid black"} bg="white">
                  <MenuItem
                    _hover={{ bg: "white" }}
                    onClick={() => router.push("/dashboard")}
                  >
                    Dashboard
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    _hover={{ bg: "white" }}
                    onClick={() => {
                      auth.signOut();
                    }}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : null}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {
        <AuthenticationModal
          isOpen={authModalState.open}
          onClose={() => setAuthModalState({ open: false, signUp: false })}
        />
      }
    </>
  );
}
