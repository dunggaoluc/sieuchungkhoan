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
            Lớp học Price Action chuyên sâu toàn diện nhất
          </Text>
          <Text sx={{ margin: "8px 0" }}>
            Chào mừng các bạn đã đến với lớp học Price Action chuyên sâu với vô
            số các kiến thức bổ ích và mới mẻ mà chắc rằng nhiều bạn chưa từng
            học hay nghe qua.
          </Text>
          <Text sx={{ margin: "8px 0" }}>
            Với khối lượng và giá trị kiến thức trong các bài học của chương
            trình thì chắc chắn là nó sẽ giá trị hơn nhiều những khoá học mà
            bình thường các bạn có thể tốn đến hàng ngàn USD chỉ cho vài ngày
            học và thậm chí nó có thể chỉ là những kiến thức rất đỗi bình
            thường.
          </Text>
          <Text sx={{ margin: "8px 0" }}>
            Các kiến thức được chia sẻ trong chương trình này có những kiến thức
            khó và cần ở bạn một sự tập trung cao độ, bên cạnh đó bạn cũng phải
            dành nhiều thời gian để thực hành phân tích trên biểu đồ thực tế thì
            dần dần bạn sẽ ngộ ra những giá trị cốt lõi của kiến thức.
          </Text>
          <Text>
            Nào bây giờ chúng ta hãy bắt đầu hành trình với những kiến thức đầy
            thú vị nhé:
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/tong-quan-danh-gia-xu-huong-thi-truong-voi-price-action"
                sx={evenLabelStyles}
              >
                1. Tổng quan đánh giá xu hướng thị trường với Price Action
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/cach-ve-va-xac-dinh-song-trong-price-action"
                sx={oddLabelStyles}
              >
                2. Cách vẽ và xác định sóng trong price action
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/diem-chot-co-ban-va-thu-cap"
                sx={oddLabelStyles}
              >
                3. Điểm chốt cơ bản và thứ cấp
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/diem-chot-thi-truong-vung-ben"
                sx={evenLabelStyles}
              >
                4. Điểm chốt thị trường vững bền
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/ket-hop-cac-diem-chot-thi-truong-trong-phan-tich-giao-dich"
                sx={evenLabelStyles}
              >
                5. Kết hợp các điểm chốt thị trường trong phân tích giao dịch
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/duong-trendline-trong-price-action"
                sx={oddLabelStyles}
              >
                6. Đường trendline trong price action
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/ung-dung-duong-trendline-trong-phan-tich-thuc-te"
                sx={oddLabelStyles}
              >
                7. Ứng dụng đường trendline trong phân tích thực tế
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/tu-duy-va-cac-buoc-xac-dinh-xu-huong-thi-truong"
                sx={evenLabelStyles}
              >
                8. Tư duy và các bước xác định xu hướng thị trường
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/truong-hop-khong-ro-xu-huong-thi-truong"
                sx={evenLabelStyles}
              >
                9. Trường hợp không rõ xu hướng thị trường
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/gioi-thieu-tong-quan-ve-cac-setup-giao-dich"
                sx={oddLabelStyles}
              >
                10. Giới thiệu tổng quan về các setup giao dịch
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/vung-giang-co-trong-price-action"
                sx={oddLabelStyles}
              >
                11. Vùng giằng co trong price action
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/pha-vo-vung-giang-co-that-bai"
                sx={evenLabelStyles}
              >
                12. Phá vỡ vùng giằng co thất bại
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/setup-voi-vung-giang-co"
                sx={evenLabelStyles}
              >
                13. Setup với vùng giằng co
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/setup-nen-xu-huong-that-bai"
                sx={oddLabelStyles}
              >
                14. Setup nến xu hướng thất bại
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/setup-giao-dich-giam-dan"
                sx={oddLabelStyles}
              >
                15. Setup giao dịch giảm dần
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/setup-giao-dich-tang-dan"
                sx={evenLabelStyles}
              >
                16. Setup giao dịch tăng dần
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/setup-vung-suc-ep"
                sx={evenLabelStyles}
              >
                17. Setup vùng sức ép
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/setup-vung-lo-lang"
                sx={oddLabelStyles}
              >
                18. Setup vùng lo lắng
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/setup-cu-hoi-yeu"
                sx={oddLabelStyles}
              >
                19. Setup cú hồi yếu
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/pha-vo-that-bai-doi-xung"
                sx={evenLabelStyles}
              >
                20. Phá vỡ thất bại đối xứng
              </Link>
            </GridItem>

            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/the-nao-la-mot-set-up-giao-dich-chat-luong-cao"
                sx={evenLabelStyles}
              >
                21. Thế nào là một setup giao dịch chất lượng cao
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/du-doan-xu-huong-bang-setup-giao-dich"
                sx={oddLabelStyles}
              >
                22. Dự đoán xu hướng bằng setup giao dịch
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/chien-thuat-vao-lenh-lai"
                sx={oddLabelStyles}
              >
                23. Chiến thuật vào lệnh lại
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/stop-loss-theo-price-action"
                sx={evenLabelStyles}
              >
                24. Stop loss theo price action
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/diem-chot-loi-theo-price-action"
                sx={evenLabelStyles}
              >
                25. Điểm chốt lời theo price action
              </Link>
            </GridItem>
            <GridItem>
              <Link
                as={RouterLink}
                href="/chi-tiet/vong-tron-phan-tich-giao-dich"
                sx={oddLabelStyles}
              >
                26. Vòng tròn phân tích giao dịch
              </Link>
            </GridItem>
          </Grid>
          <Text sx={{ margin: "8px 0" }}>
            Các kiến thức trong khoá học Price Action chuyên sâu này là rất
            nhiều và khá phức tạp nên mong rằng các bạn hãy có sự tập trung cao
            nhất để học tập một cách hiệu quả.
          </Text>
          <Text sx={{ margin: "8px 0" }}>
            Đồng thời với rất nhiều hình ảnh, ví dụ và chú thích mà đôi khi có
            sự sai sót trong trình bày thì mong các bạn thông cảm và có thể để
            lại comment dưới phần bình luận để Học Price Action biết và điều
            chỉnh lại chính xác hơn.
          </Text>
          <Text sx={{ margin: "8px 0" }}>
            Ngoài ra, trong quá trình tìm hiểu và nghiên cứu nếu có thắc mắc gì
            về kiến thức đã học các bạn cũng để lại comment của mỗi bài học, Học
            Price Action sẽ hồi đáp sớm nhất.
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

  return <UserLayout isDetail title="Lớp học Price Action chuyên sâu toàn diện nhất">{_renderMain()}</UserLayout>;
}
