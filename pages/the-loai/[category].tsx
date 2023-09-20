import { HStack, Link, Stack, Text, VStack } from "@chakra-ui/react";
import { UserLayout } from "../../components/default-layout";
import { getPostByCategory } from "../../firebase/firestore/postsStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RouterLink from "next/link";
import { categories } from "../../constants/categoryPost";
import Image from "next/image";

export default function Category() {
  const router = useRouter();
  const [post, setPost] = useState<any[]>([]);
  const [label, setLabel] = useState<string>("");
  const category = router.query.category;

  const getPost = async () => {
    if (category && typeof category === "string") {
      const getData = await getPostByCategory(category);
      setPost(getData);
    }
  };

  useEffect(() => {
    if (category) {
      const findCategory = categories.find(
        (item: { value: string }) => item.value === category
      );
      if (findCategory) setLabel(findCategory.categoryName);
    }
    getPost();
  }, [category]);

  const _renderMain = () => {
    return (
      <Stack direction="column">
        <Text
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#2d6c9a",
            textTransform: "uppercase",
          }}
        >
          {label}
        </Text>
        <VStack alignItems="unset">
          {post.length > 0 ? (
            post.map((item: any, index: number) => (
              <Link
                as={RouterLink}
                href={`/chi-tiet/${item.id}`}
                key={`post-${index}`}
              >
                <HStack justifyContent="unset" alignItems="unset">
                  <Image
                    src={item.image}
                    alt={`Image ${item.title}`}
                    width={200}
                    height={120}
                    objectFit="cover"
                  />
                  <VStack alignItems="unset" flex={1}>
                    <Text
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#004370",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      sx={{
                        fontSize: "13",
                        fontWeight: 400,
                      }}
                    >
                      {item.desc}
                    </Text>
                    <VStack
                      flex={1}
                      alignItems="flex-end"
                      justifyContent="flex-end"
                    >
                      <Text
                        sx={{
                          fontSize: "13px",
                          fontStyle: "italic",
                          color: "#888",
                        }}
                      >
                        {new Date(
                          item?.createdAt?.seconds * 1000
                        ).toLocaleDateString()}
                      </Text>
                    </VStack>
                  </VStack>
                </HStack>
              </Link>
            ))
          ) : (
            <Text
              sx={{
                fontSize: "18px",
                fontWeight: 400,
              }}
            >
              Không có bài viết!
            </Text>
          )}
        </VStack>
      </Stack>
    );
  };

  return <UserLayout isDetail title={label}>{_renderMain()}</UserLayout>;
}
