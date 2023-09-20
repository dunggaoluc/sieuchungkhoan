import React from "react";
import { Container, Image, Link, Stack, Text } from "@chakra-ui/react";
import {
  AiOutlineBarChart,
  AiOutlineLike,
  AiOutlineRead,
} from "react-icons/ai";
import RouterLink from "next/link";
import dayjs from 'dayjs';
require('dayjs/locale/vi');

dayjs.locale('vi');

const itemStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  cursor: "pointer",
};

const iconStyles = {
  backgroundClip: "red",
  fontSize: "34px",
  border: `solid 1px #ccc`,
  borderRadius: "50%",
  padding: 2,
};

const labelStyles = {
  color: "#23577f",
  fontSize: 13,
  maxWidth: 160,
};

export const SectionNav: React.FC = () => {
  const [formattedDate, setFormattedDate] = React.useState("");

  React.useEffect(() => {
    const timer = () => {
      const date = dayjs();
      const formatDate = date.format("dddd, DD/MM/YYYY, hh:mm:ss A")
      setFormattedDate(formatDate);
    };
    const timerInterval = setInterval(timer, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

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
      maxW={"1200px"}
    >
      <Link as={RouterLink} href="/">
        <Image
          alt="hình ảnh"
          height="50px"
          src="/logo_dat_dau_trang_chu.png"
        />
      </Link>
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
        }}
      >
        <Stack sx={itemStyles} role="group">
          <Stack
            sx={iconStyles}
            _groupHover={{ color: "#23577f", borderColor: "#23577f" }}
          >
            <AiOutlineRead />
          </Stack>
          <Link
            as={RouterLink}
            sx={labelStyles}
            href="/chi-tiet/huong-dan-mo-tai-khoan-chung-khoan"
          >
            Mở tài khoản chứng khoán
          </Link>
        </Stack>
        <Stack sx={itemStyles} role="group">
          <Stack
            sx={iconStyles}
            _groupHover={{ color: "#23577f", borderColor: "#23577f" }}
          >
            <AiOutlineBarChart />
          </Stack>
          <Link
            as={RouterLink}
            sx={labelStyles}
            href="/the-loai/phan-mem-chung-khoan"
          >
            Cài đặt Robot/ Phần mềm chứng khoán tận nơi
          </Link>
        </Stack>
        <Stack sx={itemStyles} role="group">
          <Stack
            sx={iconStyles}
            _groupHover={{ color: "#23577f", borderColor: "#23577f" }}
          >
            <AiOutlineLike />
          </Stack>
          <Link
            as={RouterLink}
            sx={labelStyles}
            href="/the-loai/quan-ly-tai-san"
          >
            Quản lý tài sản
          </Link>
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
          alignItems: "flex-end",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
        width={300}
      >
        <Text
          sx={{
            fontSize: 13,
            maxWidth: "100%",
            textTransform: 'capitalize'
          }}
        >
          {formattedDate}
        </Text>
      </Stack>
    </Container>
  );
};
