import { UserLayout } from "@/components/default-layout";
import {
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import RouterLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const evenLabelStyles = {
  display: "inline-flex",
  fontSize: "18px",
  textTransform: "uppercase",
  fontWeight: 600,
  background: "#91e2bf",
  width: "100%",
  textAlign: "center",
  justifyContent: "center",
  padding: "10px 0",
  height: "100%",
  alignItems: "center",
  minHeight: "40px",
  ":hover": {
    cursor: "pointer",
    color: "#ffffff",
    textDecoration: "none",
    background: "#31a08e",
  },
};

const oddLabelStyles = {
  display: "inline-flex",
  fontSize: "18px",
  textTransform: "uppercase",
  fontWeight: 600,
  background: "#58bee2",
  width: "100%",
  textAlign: "center",
  justifyContent: "center",
  padding: "10px 0",
  height: "100%",
  alignItems: "center",
  minHeight: "40px",
  ":hover": {
    cursor: "pointer",
    color: "#ffffff",
    textDecoration: "none",
    background: "#3a8bc9",
  },
};

const subtitleStyles = {
  background: "#eee",
  padding: "10px 8px",
};

export default function DetailsPost() {
  const router = useRouter();

  const _renderBreadcrumbs = () => {
    return (
      <Flex
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "solid #ccc 1px",
          padding: "10px 0px",
          zIndex: 4,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: "#08639f",
          }}
        >
          <Link href={"/"} style={{ fontSize: "14px" }}>
            Trang chủ{" "}
          </Link>
          <AiOutlineArrowRight />
          <Text>{router.query.slug}</Text>
        </Stack>
        <Stack>
          <Text sx={{ fontSize: "14px" }}>{dayjs().format("DD/MM/YYYY")}</Text>
        </Stack>
      </Flex>
    );
  };

  const _renderDetail = () => {
    return (
      <Flex
        sx={{
          flexDirection: "column",
          marginTop: 2,
        }}
      >
        <Stack
          sx={{
            padding: "0 5px",
            width: "100%",
            height: "100%", // Set height to 100%
          }}
        >
          <Text sx={{ margin: "8px 0", fontSize: "30px", fontWeight: 600 }}>
            Lớp học Indicator - Chỉ báo kỹ thuật
          </Text>
          <Text>Chào mừng bạn đến với lợp học</Text>
          <Text>
            Những chỉ báo kỹ thuật – Indicator hoàn toàn căn bản và đơn giản
            nhưng đôi khi nó lại giá trị hơn nhiều so với những công cụ trả phí
            bạn mua ở đâu đó trên mạng.
          </Text>
          <Text>
            Đây là lợp học về các chỉ báo kỹ thuật quan trọng hàng đầu mà hầu
            như ai theo trường phái phân tích kỹ thuật cũng nên biết, từ đó các
            bạn sẽ đưa vào áp dụng và theo thời gian ta chọn được một hoặc một
            vài indicator yêu thích theo phong cách giao dịch của mình.
          </Text>
          <Text>
            Với tư cách là những Price Action trader thì chỉ báo kỹ thuật cũng
            hỗ trợ rất tốt trong việc bổ sung thêm sự tin cậy cho tín hiệu giao
            dịch mà việc phân tích hành động giá mang lại cho chúng ta.
          </Text>
          <Text>
            Để tìm hiểu kiến thức chung về Indicator – chỉ báo phân tích kỹ
            thuật cũng như là phân loại các dạng chỉ báo thì các bạn hãy đọc bài
            viết{" "}
          </Text>
          <Text
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              textAlign: "center",
              padding: "14px 0",
              background: "#ffdede",
            }}
          >
            Chỉ báo xu hướng (Trend Indicator)
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/moving-average"
                sx={evenLabelStyles}
              >
                Moving Average (Đường trung bình)
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/bolling-brands"
                sx={oddLabelStyles}
              >
                Bolling brands (Dải băng bollinger)
              </Link>
            </GridItem>
          </Grid>
        </Stack>
      </Flex>
    );
  };

  const _renderMain = () => {
    return (
      <>
        {_renderBreadcrumbs()}
        {_renderDetail()}
      </>
    );
  };

  return (
    <UserLayout isDetail title="Lớp học Indicator - Chỉ báo kỹ thuật">
      {_renderMain()}
    </UserLayout>
  );
}
