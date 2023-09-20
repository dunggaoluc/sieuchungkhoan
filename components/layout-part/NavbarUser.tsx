import { Container, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { FacebookShareButton, FacebookIcon } from "next-share";
import { useEffect, useState } from "react";
import {
  AiOutlineBarChart,
  AiOutlineRead,
  AiOutlineLike,
  AiOutlineSearch,
} from "react-icons/ai";

export default function NavbarUser() {
  const [hoveredElement, setHoveredElement] = useState(null);
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

  const handleHover = (element: any) => {
    setHoveredElement(element);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  const isElementHovered = (element: any) => {
    return element === hoveredElement;
  };

  const _renderTopBar = () => {
    return (
      <Flex
        sx={{
          backgroundColor: "#f5f5f5",
          width: "100%",
          padding: "5px 0",
        }}>
        <Container
          maxW="1200px"
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Stack>
            <Text
              sx={{
                fontWeight: "bold",
              }}
              color={"#5b7e9e"}>
              Mobile / Zalo:{" "}
              <span
                style={{
                  color: "red",
                }}>
                0709164911
              </span>
            </Text>
          </Stack>

          <FacebookShareButton
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            url="http://localhost:3000/"
            quote={
              "next-share is a social share buttons for your next React apps."
            }
            hashtag={"#nextshare"}>
            <FacebookIcon size={32} round />
            <Text
              sx={{
                fontWeight: "bold",
                marginLeft: "6px",
              }}
              color={"#5b7e9e"}>
              Share
            </Text>
          </FacebookShareButton>
        </Container>
      </Flex>
    );
  };

  const _renderSectionNavbar = () => {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "12px 0",
          width: "100%",
          justifyContent: {
            md: "space-around",
            lg: "space-around",
            base: "center",
          },
        }}
        maxW={"1200px"}>
        <Stack>
          <Image
            alt="hình ảnh"
            width={300}
            src="https://dautucophieu.net/wp-content/themes/dautucophieu/images/logo.png"
          />
        </Stack>
        <Stack
          sx={{
            display: {
              lg: "flex",
              md: "none",
              base: "none",
              sm: "none",
            },
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Stack
            onMouseEnter={() => handleHover("stack1")}
            onMouseLeave={handleMouseLeave}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: isElementHovered("stack1") ? "#2984a6" : "unset",
              cursor: "pointer",
            }}>
            <Stack
              sx={{
                backgroundClip: "red",
                fontSize: "34px",
                border: `solid 2px ${
                  isElementHovered("stack1") ? "#2984a6" : "#ccc"
                }`,
                borderRadius: "50%",
                padding: 2,
              }}>
              <AiOutlineRead
                color={isElementHovered("stack1") ? "#2984a6" : "unset"}
              />
            </Stack>
            <Text
              sx={{
                color: "#23577f",
                fontSize: 14,
                maxWidth: 160,
              }}>
              Hướng dẫn mở tài khoản chứng khoán
            </Text>
          </Stack>
          <Stack
            onMouseEnter={() => handleHover("stack2")}
            onMouseLeave={handleMouseLeave}
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: isElementHovered("stack2") ? "#2984a6" : "unset",
            }}>
            <Stack
              sx={{
                backgroundClip: "red",
                fontSize: "34px",
                border: `solid 2px ${
                  isElementHovered("stack2") ? "#2984a6" : "#ccc"
                }`,
                borderRadius: "50%",
                padding: 2,
              }}>
              <AiOutlineBarChart
                color={isElementHovered("stack2") ? "#2984a6" : "unset"}
              />
            </Stack>
            <Text
              sx={{
                color: "#23577f",
                fontSize: 14,
                maxWidth: 160,
              }}>
              Cách xem bảng giá chứng khoán
            </Text>
          </Stack>
          <Stack
            onMouseEnter={() => handleHover("stack3")}
            onMouseLeave={handleMouseLeave}
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: isElementHovered("stack3") ? "#2984a6" : "unset",
            }}>
            <Stack
              sx={{
                fontSize: "34px",
                border: `solid 2px ${
                  isElementHovered("stack3") ? "#2984a6" : "#ccc"
                }`,
                borderRadius: "50%",
                padding: 2,
              }}>
              <AiOutlineLike
                color={isElementHovered("stack3") ? "#2984a6" : "unset"}
              />
            </Stack>
            <Text
              sx={{
                color: "#17507a ",
                fontSize: 14,
                maxWidth: 160,
              }}>
              Uỷ thác đầu tư hiệu quả
            </Text>
          </Stack>
        </Stack>
        <Stack
          sx={{
            display: {
              lg: "flex",
              md: "flex",
              base: "none",
              sm: "none",
            },
            flexDirection: "column",
            justifyContent: "center",
          }}
          width={300}>
          <Stack
            sx={{
              position: "relative",
            }}>
            <Input size={"sm"} placeholder="Nhập mã chứng khoáng..." />
            <AiOutlineSearch
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "8px",
                right: "8px",
              }}
            />
          </Stack>
          <Text
            sx={{
              fontSize: 14,
              maxWidth: "100%",
            }}>
            {formattedDate}
          </Text>
        </Stack>
      </Container>
    );
  };

  const _renderMainNavbar = () => {};

  return (
    <>
      {_renderTopBar()} {_renderSectionNavbar()}
    </>
  );
}
