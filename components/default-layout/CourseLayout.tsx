/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Footer, Header } from "../layout-part";
import { useCookies } from "react-cookie";
import Head from "next/head";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useRouter } from "next/router";
import NavbarUser from "../layout-part/navbar-user";
import Ads from "../layout-part/Advertisement";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Container,
  Image,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { getAllPost, getLatestPosts } from "@/firebase/firestore/postsStore";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

interface IProps {
  children: JSX.Element;
  title?: string;
  description?: string;
  isDetail?: boolean;
}
const responsive = {
  desktop: {
    breakpoint: { max: 1000, min: 1024 },
    items: 6,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CourseLayout: React.FC<IProps> = ({
  children,
  title,
  description,
  isDetail,
}) => {
  const carouselRef = useRef<Carousel>(null);
  const { pathname } = useRouter();
  const [open, setOpen] = React.useState(false);
  const [slides, setSlides] = React.useState<{ src: string }[]>([]);
  const [slideIndex, setSlideIndex] = React.useState<number>(0);
  const [posts, setPosts] = useState<any[]>([]);

  const getPost = async () => {
    const listPost = await getLatestPosts();
    setPosts(listPost);
  };

  useEffect(() => {
    document.body.style.userSelect = "none";
    document.oncontextmenu = document.body.oncontextmenu = function () {
      return false;
    };
    document.addEventListener("contextmenu", (e) => {
      const selection = window.getSelection();
      if (selection && selection.type === "Range") {
        e.preventDefault();
      }
    });
    document.addEventListener("copy", (e) => {
      e.preventDefault();
      return false;
    });
    document.addEventListener("cut", (e) => {
      e.preventDefault();
      return false;
    });
    document.addEventListener("paste", (e) => {
      e.preventDefault();
      return false;
    });
  }, []);

  React.useEffect(() => {
    const imgElements = document.querySelectorAll("img");
    const resolveSlidesUrl: { src: string }[] = [];
    imgElements.forEach((item: HTMLImageElement, index: number) => {
      const isGalleryView = item.classList.contains("gallery-view");
      if (isGalleryView) {
        const { src } = item;
        resolveSlidesUrl.push({ src });
        item.onclick = () => {
          setSlideIndex(index);
          setOpen(true);
        };
      }
    });
    setSlides(resolveSlidesUrl);
  }, [pathname]);

  const _renderContactBar = () => {
    return (
      <VStack
        sx={{ gap: "10px" }}
        bottom={[0, 0, 0, 10]}
        left={[0, 0, 0, 15]}
        right={[0, 0, 0, "unset"]}
        position={["unset", "unset", "fixed", "fixed"]}
        flexDirection={["row", "row", "row", "column"]}
        justifyContent={["space-evenly", "space-evenly", "space-evenly"]}
        padding={["10px 0", "10px 0", "10px 0", "0"]}
        background={["#f9f9f9", "#f9f9f9", "#f9f9f9", "transparent"]}
        borderTop={[
          "1px solid #ccc",
          "1px solid #ccc",
          "1px solid #ccc",
          "unset",
        ]}
      >
        <Tooltip
          label="Gọi ngay"
          placement="right"
          display={["none", "none", "none", "flex"]}
        >
          <VStack>
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                background: "#00b8d4",
                borderRadius: "full",
              }}
              _hover={{
                cursor: "pointer",
                boxShadow: "2xl",
              }}
            >
              <Image
                src="/widget_icon_click_to_call.svg"
                width="40"
                height="40"
                alt="Feedback"
              />
            </Stack>
            <Text
              display={["block", "block", "block", "none"]}
              sx={{ fontSize: "11px" }}
            >
              Gọi ngay
            </Text>
          </VStack>
        </Tooltip>

        <Tooltip
          label="Zalo chat"
          placement="right"
          display={["none", "none", "none", "flex"]}
        >
          <VStack>
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                background: "#00b8d4",
                borderRadius: "full",
              }}
              _hover={{
                cursor: "pointer",
                boxShadow: "2xl",
              }}
            >
              <Image
                src="/widget_icon_zalo.svg"
                width="40"
                height="40"
                alt="Feedback"
              />
            </Stack>
            <Text
              display={["block", "block", "block", "none"]}
              sx={{ fontSize: "11px" }}
            >
              Zalo chat
            </Text>
          </VStack>
        </Tooltip>
        <Tooltip
          label="Mở tài khoản"
          placement="right"
          display={["none", "none", "none", "flex"]}
        >
          <VStack>
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                background: "#00b8d4",
                borderRadius: "full",
              }}
              _hover={{
                cursor: "pointer",
                boxShadow: "2xl",
              }}
            >
              <Image
                src="/widget_icon_download_doc.svg"
                width="40"
                height="40"
                alt="Feedback"
              />
            </Stack>
            <Text
              display={["block", "block", "block", "none"]}
              sx={{ fontSize: "11px" }}
            >
              Mở tài khoản
            </Text>
          </VStack>
        </Tooltip>

        <Tooltip
          label="Góp ý"
          placement="right"
          display={["none", "none", "none", "flex"]}
        >
          <VStack>
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                background: "#00b8d4",
                borderRadius: "full",
              }}
              _hover={{
                cursor: "pointer",
                boxShadow: "2xl",
              }}
            >
              <Image
                src="/feedback-white-icon.png"
                width="20px"
                height="20px"
                alt="Feedback"
              />
            </Stack>
            <Text
              display={["block", "block", "block", "none"]}
              sx={{ fontSize: "11px" }}
            >
              Góp ý
            </Text>
          </VStack>
        </Tooltip>
      </VStack>
    );
  };

  const _renderTopFooter = () => {
    return (
      <Container
        sx={{
          paddingTop: 2,
          height: 100,
          alignItems: "center",
          display: "flex-end",
          borderBottom: "solid 1px #f8f8f8",
          "*": {
            userSelect: "none",
          },
        }}
        maxW={"1200px"}
      >
        <Carousel
          arrows={false}
          ref={carouselRef}
          swipeable={false}
          draggable={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          transitionDuration={3000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {posts?.map((item, index) => {
            return (
              <div key={index}>
                {posts.length === 0 ? (
                  <>loading </>
                ) : (
                  <Box>
                    <Link
                      href={`/chi-tiet/${item.id}`}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        height: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        width={"30%"}
                        sx={{
                          height: {
                            base: "4rem",
                            lg: "5rem",
                          },
                          objectFit: "contain",
                        }}
                        src={item.image}
                        alt="Hình ảnh"
                      />
                      <Text
                        sx={{
                          color: "#2984a6",
                          fontSize: 14,
                          padding: "5px 5px",
                          height: "4rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.title}
                      </Text>
                    </Link>
                  </Box>
                )}
              </div>
            );
          })}
        </Carousel>
      </Container>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
      marginBottom={["60px", "60px", "85px", "unset"]}
    >
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta
          property="og:description"
          content={description}
          key="décription"
        />
        <meta name="title" content={title}></meta>
        <meta name="description" content={description}></meta>
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <NavbarUser />
      {/* {isDetail == true ? _renderTopFooter() : null} */}
      <Container
        sx={{
          display: "flex",
          flex: 1,
          gap: 4,
          flexDirection: {
            base: "column",
            md: "column",
            sm: "column",
            lg: "row",
          },
          marginTop: 3,
          marginBottom: 3,
          maxWidth: {
            base: "800px",
            md: "800px",
            sm: "800px",
            lg: "1200px",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Container>

      <Footer />
      {_renderContactBar()}
      <ToastContainer />
    </Box>
  );
};

export default CourseLayout;
