import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Img,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import AuthenticationModal from "../AuthenticationModal";
import { useSession } from "../../utils/hooks";
import { auth } from "../../shared/auth/supabase";
import { authenticationModalState } from "../../shared/recoil/atoms";
import { useRecoilState } from "recoil";

const Links = [{ label: "Find workshops", onClick: () => "" }];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"/workshops"}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const session = useSession();

  const [authModalIsOpen, setAuthModalModalIsOpen] = useRecoilState(
    authenticationModalState
  );

  return (
    <>
      <Box px={4} borderBottom="1px" borderBottomColor={"gray.100"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box onClick={() => router.push("/")}>
              <Img
                height={"45px"}
                cursor="pointer"
                src="https://avatars.githubusercontent.com/u/93862968?s=400&u=e306baa9eeb66de4ea0b6b97058c68d44d503cf0&v=4"
              ></Img>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.label}>{link.label}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {!session?.user ? (
              <Button
                variant={"text"}
                size={"sm"}
                onClick={() => setAuthModalModalIsOpen(true)}
              >
                Log in
              </Button>
            ) : null}
            {session?.user ? (
              <Button
                variant={"text"}
                size={"sm"}
                mr={4}
                onClick={() => router.push("/workshops/new")}
                color="green.500"
              >
                Create a workshop
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
                <MenuList>
                  <MenuItem onClick={() => router.push("/me")}>
                    View profile
                  </MenuItem>
                  <MenuItem onClick={() => router.push("/me/dashboard")}>
                    Dashboard
                  </MenuItem>
                  <Divider />
                  <MenuItem
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
                <NavLink key={link.label}>{link.label}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {
        <AuthenticationModal
          isOpen={authModalIsOpen}
          onClose={() => setAuthModalModalIsOpen(false)}
        />
      }
    </>
  );
}
