import Image from "next/image";
import { UserLayout } from "../components/default-layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import HomeLayout from "../components/layout-part/trang-chu";

interface INews {
  label: string;
  description: string;
  path: string;
  thumbnail: string;
}

const Home = () => {
  const getData = async () => {};

  React.useEffect(() => {
    getData();
  }, []);

  const _renderHomeContent = () => {
    return (
      <Stack direction="column">
        <HomeLayout />
      </Stack>
    );
  };

  return (
    <UserLayout title="Siêu chứng khoán" description="Desc">
      {_renderHomeContent()}
    </UserLayout>
  );
};

export default Home;
