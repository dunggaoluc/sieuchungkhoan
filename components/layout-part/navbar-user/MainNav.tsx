import {
  Box,
  Flex,
  Container,
  Stack,
  Icon,
  Link,
  useDisclosure,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { AiFillCaretDown, AiOutlineMenu } from "react-icons/ai";
import { ListNavMenu } from "./Contant.Mainnav";
import RouterLink from "next/link";

export const MainNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any | null>(null);

  const styleOfMenuItem = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRight: "solid 0.5px rgba(0,0,0,0.2)",
    height: "38px",
    fontWeight: "bold",
    fontSize: "12px",
    transition: "background-color 0.3s ease",
    padding: "8px 12px",
  };

  const styleMobileOfMenuItem = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "pointer",
    borderRight: "solid 0.5px rgba(0,0,0,0.2)",
    height: "38px",
    fontWeight: "bold",
    fontSize: "12px",
    transition: "background-color 0.3s ease",
    padding: "8px 12px",
    color: "#FFFFFF",
  };

  const hoverStyles = {
    backgroundColor: "#409c35",
    color: "#FFFFFF",
  };

  const hoverMobileStyles = {
    backgroundColor: "#000000",
    color: "#FFFFFF",
  };

  return (
    <Box
      sx={{
        bgColor: "#004370",
        color: "#fff",
      }}
      as="nav"
      boxShadow="md"
    >
      <Container maxW={"1200px"}>
        <Flex
          display={["flex", "flex", "flex", "none"]}
          sx={{
            listStyle: "none",
            flexWrap: "wrap",
            textDecorationLine: "none",
            alignItems: "center",
            justifyContent: {
              base: "unset",
              md: "flex-start",
              sm: "flex-start",
            },
            padding: 0,
            height: "40px",
          }}
          p={4}
        >
          <Icon
            as={AiOutlineMenu}
            sx={{ fontSize: "24px" }}
            _hover={{ cursor: "pointer" }}
            ref={btnRef}
            onClick={onOpen}
          />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="xs"
          >
            <DrawerOverlay />
            <DrawerContent sx={{ background: "#222222" }}>
              <DrawerCloseButton color="white" />
              <DrawerHeader
                sx={{
                  fontSize: "14px",
                  color: "#ccc",
                  textTransform: "uppercase",
                  backgroundColor: "#3d3d3d",
                }}
              >
                Danh mục
              </DrawerHeader>
              <Stack direction="column" overflow="auto">
                {ListNavMenu.map(
                  (menu: {
                    key: string;
                    value: string;
                    href?: string;
                    child?: { key: string; value: string }[];
                  }) => {
                    const menuChildLength = menu.child?.length || 0;
                    if (menu.child && menu.child?.length === 0)
                      return (
                        <Link
                          as={RouterLink}
                          passHref
                          href={(menu.href && menu.href) || "#"}
                          style={styleMobileOfMenuItem}
                          key={menu.key}
                          _hover={hoverMobileStyles}
                        >
                          {menu.value}
                        </Link>
                      );
                    else
                      return (
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            position: "relative",
                          }}
                          key={menu.key}
                          role="group"
                        >
                          <Link
                            as={RouterLink}
                            passHref
                            style={styleMobileOfMenuItem}
                            href={(menu.href && menu.href) || "#"}
                            _groupHover={hoverMobileStyles}
                          >
                            {menu.value}
                            <Icon as={AiFillCaretDown} sx={{ ml: 2 }} />
                          </Link>
                          <Stack
                            sx={{
                              width: "100%",
                              height: `${menuChildLength * 32}px`,
                              gap: 0,
                              overflow: "hidden",
                              zIndex: 1,
                            }}
                            _groupHover={{
                              height: `${menuChildLength * 32}px`,
                            }}
                          >
                            {menu?.child?.map(
                              (childMenu: {
                                key: string;
                                value: string;
                                href?: string;
                                children?: { key: string; value: string }[];
                              }) => {
                                return (
                                  <Link
                                    sx={{
                                      fontSize: "13px",
                                      fontWeight: 600,
                                      display: "flex",
                                      alignItems: "center",
                                      padding: "0 10px",
                                      height: "32px",
                                      color: "#FFFFFF",
                                      paddingLeft: "40px",
                                    }}
                                    _hover={{
                                      color: "#000000",
                                      backgroundColor: "#FFFFFF",
                                    }}
                                    key={childMenu.key}
                                    as={RouterLink}
                                    href={childMenu.href}
                                  >
                                    {childMenu.value}
                                  </Link>
                                );
                              }
                            )}
                          </Stack>
                        </Stack>
                      );
                  }
                )}
              </Stack>
            </DrawerContent>
          </Drawer>
        </Flex>
        <Flex
          display={["none", "none", "none", "flex"]}
          sx={{
            listStyle: "none",
            flexWrap: "wrap",
            textDecorationLine: "none",
            alignItems: "center",
            justifyContent: {
              base: "unset",
              md: "flex-start",
              sm: "flex-start",
            },
            padding: 0,
            height: "auto",
          }}
          p={4}
        >
          {ListNavMenu.map(
            (menu: {
              key: string;
              value: string;
              href?: string;
              child?: { key: string; value: string }[];
            }) => {
              const menuChildLength = menu.child?.length || 0;
              if (menu.child && menu.child?.length === 0)
                return (
                  <Link
                    as={RouterLink}
                    passHref
                    href={(menu.href && menu.href) || "#"}
                    style={styleOfMenuItem}
                    key={menu.key}
                    _hover={hoverStyles}
                  >
                    {menu.value}
                  </Link>
                );
              else
                return (
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      position: "relative",
                    }}
                    key={menu.key}
                    role="group"
                  >
                    <Link
                      as={RouterLink}
                      passHref
                      style={styleOfMenuItem}
                      href={(menu.href && menu.href) || "#"}
                      _groupHover={hoverStyles}
                    >
                      {menu.value}
                      <Icon as={AiFillCaretDown} sx={{ ml: 2 }} />
                    </Link>
                    <Stack
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "240px",
                        height: "0px",
                        gap: 0,
                        overflow: "hidden",
                        zIndex: 1,
                      }}
                      _groupHover={{
                        height: `${menuChildLength * 32}px`,
                      }}
                    >
                      {menu?.child?.map(
                        (childMenu: {
                          key: string;
                          value: string;
                          href?: string;
                          children?: { key: string; value: string }[];
                        }) => {
                          return (
                            <Link
                              sx={{
                                fontSize: "13px",
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                padding: "0 10px",
                                height: "32px",
                                color: "#FFFFFF",
                                backgroundColor: "#409c35",
                              }}
                              _hover={{
                                color: "#000000",
                                backgroundColor: "#FFFFFF",
                              }}
                              key={childMenu.key}
                              as={RouterLink}
                              href={childMenu.href}
                            >
                              {childMenu.value}
                            </Link>
                          );
                        }
                      )}
                    </Stack>
                  </Stack>
                );
            }
          )}
        </Flex>
      </Container>
    </Box>
  );
};
