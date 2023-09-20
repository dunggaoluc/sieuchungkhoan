import RouterLink from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Container, Flex, Stack, Text, Link } from "@chakra-ui/react";
import { useRef } from "react";

const items: any[] = [];

const Footer = () => {
  const carouselRef = useRef<Carousel>(null);
  const responsive = {
    desktop: {
      breakpoint: { max: 2500, min: 1024 },
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

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.previous(1);
    }
  };
  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next(1);
    }
  };

  const _renderTopFooer = () => {
    return (
      <Container
        sx={{
          backgroundColor: "#f5f5f5",
        }}
        maxW={"1200px"}
      >
        {/* <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "3px 2px",
            borderBottom: "1px #ccc solid",
            marginBottom: 5,
          }}>
          <Text
            sx={{
              color: "#004370",
              fontWeight: "bold",
              fontSize: 18,
            }}>
            ĐỐI TÁC
          </Text>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "3px 0",
            }}>
            <Button
              variant={"outline"}
              className="custom-prev-button"
              onClick={handlePrevClick}
              leftIcon={<AiFillCaretLeft />}></Button>
            <Button
              variant={"outline"}
              className="custom-prev-button"
              onClick={handleNextClick}
              leftIcon={<AiFillCaretRight />}></Button>
          </Stack>
        </Stack> */}
        <Carousel
          arrows={false}
          ref={carouselRef}
          swipeable={false}
          draggable={false}
          // showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1500}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {items.map((item, index) => {
            return (
              <div
                style={{
                  margin: "0 6px",
                }}
                key={index}
              >
                {item}
              </div>
            );
          })}
        </Carousel>
      </Container>
    );
  };

  const _renderMainFooter = () => {
    const styleChildText = {
      display: "flex",
      fontWeight: "bold",
      fontSize: 13,
      margin: "6px 0",
      cursor: "pointer",
      _hover: {
        color: "black",
      },
    };
    return (
      <Flex
        sx={{
          padding: "20px 20px",
          bgColor: "#004370",

          color: "white",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: {
              base: "column",
              md: "row",
              lg: "row",
            },
            justifyContent: {
              base: "center",
              md: "space-between",
              lg: "space-between",
            },
            alignItems: {
              base: "center",
              md: "unset",
              lg: "unset",
            },
          }}
          maxW={"1200px"}
        >
          <Box
            sx={{
              width: {
                base: "100%",
                md: "25%",
                lg: "25%",
              },
              textAlign: {
                base: "center",
                md: "unset",
                lg: "unset",
              },
            }}
          >
            <Text
              sx={{
                color: "#6dee5d",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Đỗ Anh Tuấn
            </Text>
            <Text sx={styleChildText}>Điện thoại / Zalo: 0788 669 289</Text>
            <Text sx={styleChildText}>Skype: sieuchungkhoan.com@gmail.com</Text>
            <Text sx={styleChildText}>
              Địa chỉ: Tầng 8, tòa nhà Pearl 5, Số 5 Lê Quý Đôn, Quận 3, TPHCM
            </Text>
            <Text sx={styleChildText}>www.sieuchungkhoan.com</Text>
          </Box>
          <Box
            sx={{
              marginTop: {
                base: "12px",
                md: "unset",
                lg: "unset",
              },
              width: {
                base: "100%",
                md: "50%",
                lg: "50%",
              },
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "50%",
                textAlign: {
                  base: "center",
                  lg: "unset",
                  md: "unset",
                },
              }}
            >
              <Text
                sx={{
                  color: "#6dee5d",
                  fontWeight: 600,
                }}
              >
                ĐẦU TƯ CHỨNG KHOÁN
              </Text>
              <Link
                as={RouterLink}
                href="/the-loai/xu-huong-thi-truong"
                sx={styleChildText}
              >
                Tin tức thị trường
              </Link>
              <Link
                as={RouterLink}
                href="/the-loai/co-phieu-noi-bat"
                sx={styleChildText}
              >
                Cổ phiếu nổi bật
              </Link>
              <Link
                as={RouterLink}
                href="/the-loai/bao-cao-chien-luoc"
                sx={styleChildText}
              >
                Báo cáo chiến lược
              </Link>
              <Link
                as={RouterLink}
                href="/khoa-hoc"
                sx={styleChildText}
              >
                Tuyển dụng và đào tạo
              </Link>
            </Box>
            <Box
              sx={{
                width: "50%",
                textAlign: {
                  base: "center",
                  lg: "unset",
                  md: "unset",
                },
              }}
            >
              <Text
                sx={{
                  color: "#6dee5d",
                  fontWeight: 600,
                }}
              >
                CÔNG CỤ PHÂN TÍCH
              </Text>
              <Link
                as={RouterLink}
                href="/the-loai/amibroker"
                sx={styleChildText}
              >
                Amibroker
              </Link>
              <Link
                as={RouterLink}
                href="/the-loai/code-amibroker"
                sx={styleChildText}
              >
                Code ALF miễn phí
              </Link>
              <Link
                as={RouterLink}
                href="/the-loai/nhom-nganh"
                sx={styleChildText}
              >
                Bộ lọc cổ phiếu
              </Link>
              <Link
                as={RouterLink}
                href="/the-loai/app-chung-khoan"
                sx={styleChildText}
              >
                App Chứng khoán
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              width: "25%",
              display: {
                base: "none",
                md: "block",
                lg: "block",
              },
            }}
          >
            <Text
              sx={{
                color: "#6dee5d",
                fontWeight: 600,
              }}
            >
              HỖ TRỢ NĐT
            </Text>
            <Link
              as={RouterLink}
              href="/chi-tiet/mo-tai-khoan-chung-khoan"
              sx={styleChildText}
            >
              Hướng dẫn mở tài khoản
            </Link>
            <Link
              as={RouterLink}
              href="/the-loai/bao-cao-chien-luoc"
              sx={styleChildText}
            >
              Chiến lược giao dịch
            </Link>
            <Link as={RouterLink} href="/the-loai/hoi-thao" sx={styleChildText}>
              Room Tư vấn
            </Link>
            <Link
              as={RouterLink}
              href="/the-loai/phan-mem-chung-khoan"
              sx={styleChildText}
            >
              Dịch vụ và Sản phẩm
            </Link>
          </Box>
        </Container>
      </Flex>
    );
  };

  const _renderBottomFooter = () => {
    return (
      <Stack
        sx={{
          padding: "10px 0",
          backgroundColor: "#01375c",
          borderTop: "1px solid #024d7f",
          color: "#fff",
        }}
      >
        <Container maxW={"1200px"}>
          <Text
            sx={{
              fontSize: "13px",
              paddingLeft: {
                base: 5,
                lg: "unset",
                md: 5,
              },
              fontWeight: 600,
            }}
          >
            Tư vấn đầu tư chứng khoán
          </Text>
        </Container>
      </Stack>
    );
  };

  return (
    <>
      {_renderTopFooer()}
      {_renderMainFooter()}
      {_renderBottomFooter()}
    </>
  );
};

export default Footer;
