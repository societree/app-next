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
import { authenticationModalIsOpen } from "../../shared/recoil/atoms";
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
    href={"#"}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const session = useSession();

  const [authModalState, setAuthModalState] = useRecoilState(
    authenticationModalIsOpen
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
            <Box onClick={() => router.push("/workshops")}>
              <Img
                height={"45px"}
                cursor="pointer"
                src="data:image/png;base64,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"
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
                mr={4}
                color="green.500"
                onClick={() => setAuthModalState(true)}
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
          isOpen={authModalState}
          onClose={() => setAuthModalState(false)}
        />
      }
    </>
  );
}
