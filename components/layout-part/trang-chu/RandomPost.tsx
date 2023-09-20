import { AspectRatio, Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getListRandomPost } from "../../../firebase/firestore/postsStore";

export default function RandomPost() {
  const [posts, setPosts] = useState<any[]>([]);

  const getRandomPosts = async () => {
    const listPost = await getListRandomPost();
    setPosts(listPost);
  };

  useEffect(() => {
    getRandomPosts();
  }, []);

  return (
    <Grid
      sx={{
        padding: 4,
        bgColor: "#f5f5f5",
        borderTop: "solid 4px #e5e5e5", // On large screens, display 3 columns
        borderBottom: "solid 4px #e5e5e5", // On large screens, display 3 columns
      }}
      templateColumns={{
        base: "1fr", // On small screens (base), display one column
        md: "repeat(3, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={4} // Set the gap between grid items
    >
      {posts.map((post: any) => {
        return (
          <Box
            key={post.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Link
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
              }}
              href={`/chi-tiet/${post.slug}`}
            >
              <Image
                alt="hình ảnh"
                height={"80px"}
                width={120}
                src={post.image}
              />
              <Text
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#004370",
                  width: "100px",
                  overflow: "hidden",
                  display: "inline-block",
                  textOverflow: "ellipsis",
                }}
              >
                {post.title}
              </Text>
            </Link>
          </Box>
        );
      })}
    </Grid>
  );
}
