import {
  Flex,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getListPostHaveTheMostView } from "../../firebase/firestore/postsStore";

export default function Ads() {
  const [posts, setPosts] = useState<any[]>([]);
  const getPosts = async () => {
    const listPosts = await getListPostHaveTheMostView();
    setPosts(listPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Stack>
      <Image src="/banner_goc_phai_trang_chu.png" width="full" alt="profile" />
      <Flex>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>
              <Text
                sx={{
                  fontSize: "13px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Đọc nhiều nhất
              </Text>
            </Tab>
            <Tab>
              <Text
                sx={{
                  fontSize: "13px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Bình chọn
              </Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel boxShadow="base">
              {posts.map((post, index) => {
                return (
                  <Link
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                    href={`/chi-tiet/${post.id}`}
                  >
                    <Text
                      _hover={{
                        color: "#409c35",
                      }}
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {index + 1}
                    </Text>
                    <Text
                      _hover={{
                        color: "#409c35",
                      }}
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {" "}
                      {post.title}
                    </Text>
                  </Link>
                );
              })}
            </TabPanel>
            <TabPanel>
              {posts.map((post, index) => {
                return (
                  <Link
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                    href={"#"}
                  >
                    <Text
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {index + 1}
                    </Text>
                    <Text
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {post.title}
                    </Text>
                  </Link>
                );
              })}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Stack>
  );
}
