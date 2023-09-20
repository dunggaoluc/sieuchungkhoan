import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import authSignOut from "../../firebase/auth/signout";
import React, { Flex, Stack, Text, Button, Box } from "@chakra-ui/react";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Flex
      sx={{
        flexDir: "column",
        height: "100vh",
        padding: 4,
      }}>
      <Text marginBottom={12} fontSize={32} as={"b"} variant={"h1"}>
        QUẢN LÝ
      </Text>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}>
        <Button
          as={Link}
          variant="outline"
          bgColor={`${
            pathname === "/quan-ly/bai-viet"
              ? "admin.900"
              : "unset"
          }`}
          color={`${
            pathname === "/quan-ly/bai-viet"
              ? "white"
              : "unset"
          }`}
          href="/quan-ly/bai-viet"
          colorScheme="admin.900">
          Quản lý bài viết
        </Button>
        <Button
          variant="outline"
          bgColor={`${
            pathname === "/quan-ly/tin-tuc"
              ? "admin.900"
              : "unset"
          }`}
          color={`${
            pathname === "/quan-ly/tin-tuc" ? "white" : "unset"
          }`}
          as={Link}
          href="/quan-ly/tin-tuc"
          colorScheme="admin.900">
          Quản lý tin tức
        </Button>
        <Button
          colorScheme="admin"
          variant="outline"
          onClick={() => router.push("/")}>
          Về Trang Chủ
        </Button>
      </Box>
    </Flex>
  );
};

export default NavBar;
