import { Box, Flex, Image, Stack, Text, Link, VStack } from "@chakra-ui/react";
import RouterLink from "next/link";
import React, { useEffect, useState } from "react";
interface IPayloadProps {
  id?: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

import { AiFillForward } from "react-icons/ai";
import RandomPost from "./RandomPost";
import {
  getAllPost,
  getLatestPosts,
} from "../../../firebase/firestore/postsStore";
import { ListPostCategories } from "@/components/layout-part/trang-chu/ListPostCategory";
import dayjs from "dayjs";

export default function HomeLayout() {
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  const [, setAllPosts] = useState<any[]>([]);
  const getSixLatestPosts = async () => {
    const listPost = await getLatestPosts();
    setLatestPosts(listPost);
  };

  const getPosts = async () => {
    const allListPosts = await getAllPost();
    setAllPosts(allListPosts);
  };

  useEffect(() => {
    getSixLatestPosts();
    getPosts();
  }, []);
  const _renderLeftHeader = () => {
    return (
      <Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Link as={RouterLink} href={`/chi-tiet/${latestPosts[0]?.slug}`}>
            <Image
              alt="hình ảnh"
              sx={{
                width: "100%",
              }}
              src={latestPosts[0]?.image}
            />
          </Link>
        </Box>
        <VStack alignItems="flex-start" sx={{ padding: "8px 0" }}>
          <Link
            as={RouterLink}
            href={`/chi-tiet/${latestPosts[0]?.slug}`}
            sx={{
              color: "#17507a",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: "4px",
            }}
          >
            {latestPosts[0]?.title}
          </Link>
          <Text
            sx={{
              fontSize: " 14px",
              textOverflow: "ellipse",
              noOfLines: 3,
              overflow: "hidden",
              maxHeight: '39px'
            }}
          >
            {latestPosts[0]?.desc}
          </Text>
        </VStack>
      </Box>
    );
  };
  const _renderRightHeader = () => {
    return (
      <Flex
        sx={{
          display: "flex",
          flexDir: "column",
          gap: 1,
        }}
      >
        <Stack
          sx={{
            backgroundColor: "#004370",
            width: "100%",
          }}
        >
          <Text
            sx={{
              fontWeight: "bold",
              color: "#fff",
              padding: 1,
              fontSize: "14px",
            }}
          >
            TIN MỚI NHẤT
          </Text>
        </Stack>
        <Stack>
          {latestPosts?.map((post: any) => {
            const formattedDate = post?.createdAt?.seconds
              ? new Date(post?.createdAt?.seconds * 1000)
              : new Date();
            const date = dayjs(formattedDate).format("DD/MM/YYYY");

            return (
              <Box
                key={post.slug}
                sx={{
                  borderBottom: "1px solid #ccc",
                  padding: 1,
                }}
              >
                <Link
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#004370",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  href={`/chi-tiet/${post.slug}`}
                >
                  <AiFillForward
                    style={{
                      color: "orange",
                    }}
                  />
                  <Text>{post.title}</Text>
                </Link>
                <Text
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#8a8a8a",
                    marginLeft: "12px",
                    marginTop: "6px",
                  }}
                >
                  {date}
                </Text>
              </Box>
            );
          })}
        </Stack>
      </Flex>
    );
  };
  const _renderHeader = () => {
    return (
      <Flex
        sx={{
          width: "100%",
          flexDirection: {
            base: "column",
            md: "row",
            sm: "column",
            lg: "row",
          },
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: {
              base: "100%",
              md: "100%",
              sm: "100%",
              lg: "60%",
            },
          }}
        >
          {_renderLeftHeader()}
        </Box>
        <Box
          sx={{
            width: {
              base: "100%",
              md: "40%",
              sm: "100%",
              lg: "40%",
            },
          }}
        >
          {_renderRightHeader()}
        </Box>
      </Flex>
    );
  };
  const _renderMain = () => {
    return (
      <>
        {_renderHeader()}
        <Image
          alt="hình ảnh"
          src="/banner_sieuchungkhoan_giua_trang_chu.png"
        />
        <RandomPost />
        <ListPostCategories />
      </>
    );
  };
  return _renderMain();
}
