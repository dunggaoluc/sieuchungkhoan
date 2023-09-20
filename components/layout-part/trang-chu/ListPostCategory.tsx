import { getAllPostWithNolimit } from "@/firebase/firestore/postsStore";
import { Box, Flex, Grid, Image, Link, Text } from "@chakra-ui/react";
import _ from "lodash";
import RouterLink from "next/link";
import { useEffect, useState } from "react";
import { AiFillForward } from "react-icons/ai";
import { categories } from "../../../constants/categoryPost";
import dayjs from "dayjs";

export const ListPostCategories = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const options: any = {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const formatted = currentDate.toLocaleString("vi-VN", options);
    setFormattedDate(formatted);
  }, []);

  const getPosts = async () => {
    const listPost = await getAllPostWithNolimit();
    const orderByListPost = await _.orderBy(listPost, "createdAt", "desc");
    const postsGroupBy = _.groupBy(orderByListPost, "category");
    const dataArray = Object.entries(postsGroupBy).map(([key, value]) => ({
      [key]: value,
    }));
    setPosts(dataArray);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderDate = (time: number) => {
    const newDate = time ? new Date(time * 1000) : new Date();
    const date = dayjs(newDate).format("DD/MM/YYYY");
    return date;
  };

  const _renderCategoryPostItem = (post: any) => {
    let renders;
    Object.entries(post).map(([key, value]: any) => {
      const firstItem = value[0]; // Get the first item in the array for the current key
      const arrayPost = value;
      const findCategory = categories.find(
        (item: { value: string }) => item.value === key
      );
      renders = (
        <Flex
          key={key}
          sx={{
            width: "100%",
            overflow: "hidden",
            border: "solid 1px #ccc",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "70%",
              backgroundColor: "#004370",
              marginTop: 2,
            }}
          >
            <Text
              sx={{
                fontSize: "12px",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#fff",
                padding: "6px 9px",
              }}
            >
              {findCategory ? findCategory.categoryName : "Không xác định"}
            </Text>
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                width: 100,
                right: "-100px",
                top: 0,
                borderLeft: "25px solid #004370",
                borderTop: "15px solid transparent",
                borderBottom: "15px solid transparent",
              }}
            />
          </Box>
          <Box
            sx={{
              padding: "9px",
            }}
          >
            <Link
              href={`/chi-tiet/${firstItem.slug}`}
              style={{
                display: "inline-flex",
                color: "#01416d",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              {firstItem.title}
            </Link>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Link
                  as={RouterLink}
                  href={`/chi-tiet/${firstItem.slug}`}
                  sx={{ display: "flex", height: "90px", width: "142px" }}
                >
                  <Image
                    alt="hình ảnh"
                    sx={{
                      height: "90px",
                      width: "142px",
                      objectFit: "cover",
                      border: "solid 2px #ccc",
                      boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.4)",
                    }}
                    src={firstItem.image}
                  />
                </Link>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <Text
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#888",
                    }}
                  >
                    {renderDate(firstItem?.createdAt?.seconds)}
                  </Text>
                  <Text
                    sx={{
                      fontSize: "13px",
                      overflow: "hidden",
                      textOverflow: "ellipse",
                      marginTop: "4px",
              maxHeight: '39px'
                    }}
                    noOfLines={2}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: firstItem.content,
                      }}
                    ></div>
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box>
              {arrayPost.map((post: any, index: number) => {
                if (index !== 0) {
                  return (
                    <Box
                      key={index}
                      sx={{
                        borderTop: "1px solid #ccc",
                        paddingTop: 2,
                        height: "100%",
                      }}
                    >
                      <Link
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
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
                        <Text
                          _hover={{
                            color: "#409c35",
                          }}
                        >
                          {post.title}
                        </Text>
                      </Link>
                      <Text
                        sx={{
                          fontSize: 12,
                        }}
                      >
                        {formattedDate}
                      </Text>
                    </Box>
                  );
                }
              })}
            </Box>
          </Box>
        </Flex>
      );
    });
    return renders;
  };

  return (
    <Grid
      sx={{
        padding: 4,
        bgColor: "#f5f5f5",
        borderTop: "solid 4px #e5e5e5",
        borderBottom: "solid 4px #e5e5e5",
      }}
      templateColumns={{
        base: "1fr",
        md: `repeat(2, 1fr)`,
        lg: `repeat(2, 1fr)`,
      }}
      gap={4}
    >
      {posts.map((post: any) => {
        return _renderCategoryPostItem(post);
      })}
    </Grid>
  );
};
