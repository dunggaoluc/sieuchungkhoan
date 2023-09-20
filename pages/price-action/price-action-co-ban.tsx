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
            Lớp học Price Action cơ bản
          </Text>
          <Text>
            Price action là một phương pháp giao dịch rất phổ biến và quen thuộc
            mà ai cũng cần phải biết, kiến thức về PA là vô cùng rộng lớn và
            nhiều trường phái khác nhau nhưng các kiến thức Price Action cơ bản
            thì rất dễ học và làm quen.
          </Text>
          <Text>
            Để có cơ sở nghiên cứu chuyên sâu hơn các kiến thức về Price Action
            thì trước tiên chúng ta cần phải tìm hiểu những kiến thức cơ bản
            này. Dưới đây là danh mục các bài viết chia sẻ về kiến thức cơ bản
            đã được sâu chuỗi một cách logic để các bạn dễ dàng tìm hiểu.
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <Text
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  textAlign: "center",
                  padding: "14px 0",
                  background: "#ffdede",
                }}
              >
                Bài học
              </Text>
            </GridItem>
            <GridItem>
              <Text
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  textAlign: "center",
                  padding: "14px 0",
                  background: "#ffdede",
                }}
              >
                Chú thích
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/price-action-la-gi"
                sx={evenLabelStyles}
              >
                Price Action là gì?
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Tìm hiểu về phương pháp giao dịch Price Action hay Hành động giá
                là gì?
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/nen-nhat-la-gi"
                sx={oddLabelStyles}
              >
                Nến Nhật là gì?
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Nến Nhật là phần không thể thiếu trong một biểu đồ giá giao dịch
                với Price Action
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/y-nghia-dang-sau-nen-nhat"
                sx={evenLabelStyles}
              >
                Ý nghĩa đằng sau nến nhật
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Mỗi cây nến đều có những thông tin để nói cho chúng ta biết về
                thị trường đang diễn ra như thế nào
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/pin-bar-la-gi"
                sx={oddLabelStyles}
              >
                Pin bar là gì?
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Pin Bar là một dạng nến đơn gặp rất nhiều trong biểu đồ nến và
                việc giao dịch với Pin Bar cũng là cơ bản nhất trong Price
                Action
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/giao-dich-voi-pin-bar"
                sx={evenLabelStyles}
              >
                Giao dịch với pin bar
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Tìm hiểu các giao dịch với nến Pin Bar một cách chi tiết
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/inside-bar-va-cach-giao-dich"
                sx={oddLabelStyles}
              >
                Inside bar và cách giao dịch
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Mô hình nến Inside bar chúng ta gặp rất nhiều trong biểu đồ giá
                thực tế và hãy xem giao dịch nó thế nào cho hiệu quả
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/mo-hinh-nen-fakey-la-gi"
                sx={evenLabelStyles}
              >
                Mô hình nến fakey là gì?
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Mô hình nến Fakey là một dạng phá vỡ giả gặp rất nhiều trong
                thực tế và hãy xem giao dịch với nó như thế nào?
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/tim-hieu-khang-cu-va-ho-tro"
                sx={oddLabelStyles}
              >
                Tìm hiểu kháng cự và hỗ trợ
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Kháng cự và hỗ trợ là những cơ sở quan trọng nhất trong giao
                dịch mà chúng ta cần phải nắm vững
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/khang-cu-va-ho-tro-chuyen-sau"
                sx={evenLabelStyles}
              >
                kháng cự và hỗ trợ chuyên sâu
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Hãy cùng tìm hiểu bản chất của hỗ trợ và kháng cự đồng thời có
                các dạng hỗ trợ kháng cự nào chúng ta cần chú ý
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/giao-dich-voi-ho-tro-va-khang-cu"
                sx={oddLabelStyles}
              >
                Giao dịch với hỗ trợ và kháng cự
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Cách giao dịch với hỗ trợ và kháng cự sao cho hiệu quả và đảm
                bảo an toàn nhất
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/cac-mau-hinh-nen-don"
                sx={evenLabelStyles}
              >
                Các mẫu hình nến đơn
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Các mẫu hình nến chỉ có 1 nến mà chúng ta thường gặp khi giao
                dịch với Price Action
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/cac-mo-hinh-co-2-nen"
                sx={oddLabelStyles}
              >
                Các mô hình có 2 nến (Nến đôi)
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Các mô hình 2 nến là gặp phổ biến nhất trong tất cả các mô hình
                nến, hãy cùng xem đó là những mẫu hình nào
              </Text>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/cac-mo-hinh-3-nen"
                sx={evenLabelStyles}
              >
                Các mô hình 3 nến
              </Link>
            </GridItem>
            <GridItem>
              <Text sx={subtitleStyles}>
                Những mô hình 3 nến tuy không gặp nhiều như mô hình 1 và 2 nến
                nhưng nó lại có độ tin cậy khá cao
              </Text>
            </GridItem>
          </Grid>
          <Text>
            Trên đây là những kiến thức cơ bản về Price Action một cách chi tiết
            nhất. Bên cạnh đó thì trang cũng sẽ thường xuyên Update thêm các
            kiến thức để hoàn thiện các bài học hơn.
          </Text>
        </Stack>
      </Flex>
    );
  };

  const _renderMain = () => {
    return (
      <>
        {_renderBreadcrumbs()}
        <Image src="https://dautucophieu.net/wp-content/themes/dautucophieu/images/dau-tu-co-phieu-facebook-group.jpg" />
        {_renderDetail()}
      </>
    );
  };

  return (
    <UserLayout isDetail title="Lớp học Price Action cơ bản">
      {_renderMain()}
    </UserLayout>
  );
}
