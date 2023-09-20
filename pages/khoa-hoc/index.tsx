import { CourseLayout } from "@/components/default-layout";
import {
  Icon,
  Input,
  List,
  ListItem,
  OrderedList,
  Stack,
  Text,
  UnorderedList,
  Button,
  Textarea,
  Box,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineTags, AiOutlineInfoCircle } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const schema = yup
  .object({
    fullname: yup.string().trim().required("Họ và tên là bắt buộc!"),
    email: yup
      .string()
      .trim()
      .email("Email sai định dạng")
      .required("Email là bắt buộc!"),
    phone: yup
      .string()
      .trim()
      .matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, {
        message: "Số điện thoại sai định dạng",
      })
      .required("Số điện thoại là bắt buộc"),
    desc: yup.string(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function DetailsPost() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isError) {
      toast.error("Đăng ký tham gia khóa học thất bại");
      setIsSuccess(false);
    }
  }, [isError]);

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Đăng ký tham gia khóa học thành công");
      setIsSuccess(false);
    }
  }, [isSuccess]);

  const sendEmail = async (subject: string, html: string) => {
    return axios({
      method: "post",
      url: "/api/send-mail",
      data: { subject, html },
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const html = `Đơn đăng ký tham gia khóa học\n<p>Họ và tên: <b>${data.fullname}</b></p>\n<p>Email: <b>${data.email}</b></p>\n<p>Số điện thoại: <b>${data.phone}</b></p>\n<p>Mô tả: <b>${data.desc}</b></p>`;
    const req = await sendEmail(
      `Đơn đăng ký tham gia khóa học - ${data.fullname}`,
      html
    );

    if (req.status === 250) {
      setIsSuccess(true);
      reset();
      setValue("fullname", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("desc", "");
      setError("fullname", { message: "" });
      setError("email", { message: "" });
      setError("phone", { message: "" });
    } else setIsError(true);

    setIsLoading(false);
  };

  const _renderFirstBox = () => {
    return (
      <Stack
        direction="column"
        sx={{
          border: "3px dashed #32c15b",
          borderRadius: "3px",
          padding: "40px 20px",
        }}
      >
        <Text sx={{ textAlign: "center" }}>KHÓA HỌC ONLINE & OFFLINE</Text>
        <Stack direction="row" justifyContent="center">
          <Text color="green" sx={{ fontWeight: 800, fontSize: "24px" }}>
            ĐẦU TƯ CHỨNG KHOÁN -{" "}
          </Text>
          <Text color="red" sx={{ fontWeight: 800, fontSize: "24px" }}>
            LỢI NHUẬN TIỀN TỶ
          </Text>
        </Stack>
        <Text sx={{ textAlign: "center" }}>
          Tất tần tật kiến thức từ hơn 10 năm kinh nghiệm Đầu tư chứng khoán của
          Nhật Cường sẽ thuộc về bạn.
        </Text>
        <Text sx={{ textAlign: "center" }}>
          Hotline: <span style={{ color: "#f56357" }}>0788669289</span>
        </Text>
        <Button
          as="a"
          size="lg"
          sx={{ fontSize: "18px", marginTop: "16px", alignSelf: "center" }}
          colorScheme="red"
          href="#register-form"
        >
          Đăng ký ngay
        </Button>
      </Stack>
    );
  };
  const _renderSecondBox = () => {
    return (
      <Stack
        direction="column"
        sx={{
          border: "3px dashed #32c15b",
          borderRadius: "3px",
          padding: "40px 20px",
        }}
      >
        <Stack direction="row" justifyContent="center">
          <Text color="green" sx={{ fontWeight: 800, fontSize: "24px" }}>
            QUÀ TẶNG ĐẶC BIỆT
          </Text>
        </Stack>
        <Text sx={{ textAlign: "center" }}>
          Được tặng ngay những bộ sách hay nhất về đầu tư chứng khoán và được
          tham gia vào room tư vấn đầu tư chứng khoán trực tuyến hàng ngày của{" "}
          <b>Anh Tuấn (Room Premium)</b>, trị giá 900K/tháng.
        </Text>
        <Text sx={{ textAlign: "center" }}>
          Hotline: <span style={{ color: "#f56357" }}>0788669289</span>
        </Text>
        <Button
          as="a"
          size="lg"
          sx={{ fontSize: "18px", marginTop: "16px", alignSelf: "center" }}
          colorScheme="red"
          maxW="sm"
          href="#register-form"
        >
          Đăng ký ngay
        </Button>
      </Stack>
    );
  };

  const _renderMain = () => {
    return (
      <Stack
        sx={{
          flexDirection: "column",
          marginTop: 2,
        }}
      >
        <Stack
          direction={["column", "column", "column", "row"]}
          alignItems="center"
          sx={{
            background:
              "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),url('/bg1.jpg')",
            backgroundPosition: "40%",
            backgroundSize: "cover",
            padding: "60px 30px",
            gap: "30px",
          }}
        >
          <Stack
            direction="column"
            alignItems="center"
            flex={1}
            sx={{ boxSizing: "border-box" }}
          >
            <Text sx={{ fontSize: "16px", color: "#ffffff" }}>
              Cơ hội tham gia khóa học Online & Offline
            </Text>
            <Text
              sx={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#ffffff",
                textAlign: "center",
                lineHeight: "40px",
              }}
            >
              ĐẦU TƯ CHỨNG KHOÁN - LỢI NHUẬN TIỀN TỶ
            </Text>
            <Text
              sx={{
                fontSize: "16px",
                color: "#ffffff",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Thời gian học: các buổi tối hàng tuần thứ 2-4-6. Học viên được
              trực tiếp Giám Đốc Chi Nhánh CTCK HSC - Đỗ Anh Tuấn giảng dạy.
            </Text>
            <Stack direction="row" sx={{ marginTop: "40px" }}>
              <Button
                size="lg"
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                }}
                leftIcon={<Icon as={AiOutlineTags} sx={{ fontSize: "20px" }} />}
                colorScheme="green"
              >
                Giảm ngay 50% học phí
              </Button>
              <Button
                size="lg"
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                }}
                color="white"
                variant="outline"
                leftIcon={
                  <Icon as={AiOutlineInfoCircle} sx={{ fontSize: "20px" }} />
                }
                as="a"
                href="#information"
              >
                Xem thêm
              </Button>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            sx={{
              background: "#ffffff",
              minWidth: "240px",
              width: "100%",
              maxWidth: "380px",
            }}
            id="register-form"
          >
            <Text
              sx={{
                color: "#2984a6",
                fontSize: "20px",
                fontWeight: 700,
                padding: "20px 20px 4px 20px",
              }}
            >
              ĐĂNG KÝ THAM GIA KHÓA HỌC
            </Text>
            <Text
              sx={{
                color: "#777777",
                fontSize: "13px",
                fontWeight: 400,
                padding: "0 20px",
              }}
            >
              Vui lòng nhập đầy đủ thông tin & chúng tôi sẽ liên hệ lại với bạn!
            </Text>
            <Stack
              direction="column"
              as="form"
              sx={{ padding: "20px", background: "#f6f8f9" }}
            >
              <Controller
                name="fullname"
                control={control}
                render={({ field }) => (
                  <FormControl isInvalid={Boolean(errors?.fullname?.message)}>
                    <Input
                      placeholder="Họ và tên*"
                      size="lg"
                      sx={{ fontSize: "15px", background: "#ffffff" }}
                      isDisabled={isLoading}
                      {...field}
                      required={false}
                    />
                    {!Boolean(errors?.fullname?.message) ? null : (
                      <FormErrorMessage>
                        {errors?.fullname?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <FormControl isInvalid={Boolean(errors?.email?.message)}>
                    <Input
                      placeholder="Email*"
                      size="lg"
                      sx={{ fontSize: "15px", background: "#ffffff" }}
                      isDisabled={isLoading}
                      {...field}
                      required={false}
                    />
                    {!Boolean(errors?.email?.message) ? null : (
                      <FormErrorMessage>
                        {errors?.email?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <FormControl isInvalid={Boolean(errors?.phone?.message)}>
                    <Input
                      placeholder="Điện thoại*"
                      size="lg"
                      sx={{ fontSize: "15px", background: "#ffffff" }}
                      isDisabled={isLoading}
                      {...field}
                      required={false}
                    />
                    {!Boolean(errors?.phone?.message) ? null : (
                      <FormErrorMessage>
                        {errors?.phone?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="desc"
                control={control}
                render={({ field }) => (
                  <Textarea
                    placeholder="Nội dung"
                    size="lg"
                    sx={{ fontSize: "15px", background: "#ffffff" }}
                    isDisabled={isLoading}
                    {...field}
                    required={false}
                  />
                )}
              />

              <Button
                size="lg"
                colorScheme="green"
                sx={{
                  fontSize: "15px",
                  fontWeight: 400,
                }}
                onClick={handleSubmit(onSubmit)}
                isLoading={isLoading}
              >
                Đăng ký ngay!
              </Button>
              <Text
                sx={{
                  fontSize: "12px",
                  color: "#a9a9a9",
                  marginTop: "40px",
                  textAlign: "center",
                }}
              >
                Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt từ khóa học.
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="column" id="information">
          <Stack direction="row" alignItems="center">
            <Icon
              as={AiOutlineInfoCircle}
              sx={{ fontSize: "20px" }}
              color="green"
            />
            <Text sx={{ fontSize: "18px", fontWeight: 500 }}>
              Bạn chưa có nhiều kiến thức hay kinh nghiệm về Thị trường Chứng
              khoán (TTCK)?
            </Text>
          </Stack>
          <UnorderedList>
            <ListItem>
              Bạn muốn đầu tư cổ phiếu nhưng không biết nên lựa chọn loại cổ
              phiếu và thời điểm mua nào để sinh lợi?
            </ListItem>
            <ListItem>
              Bạn muốn hạn chế rủi ro, thua lỗ xuống mức thấp nhất khi đầu tư
              vào TTCK?
            </ListItem>
            <ListItem>
              Bạn đang tìm một chuyên gia giúp bạn định hướng và nắm chắc nguyên
              lý, cách thức đầu tư chứng khoán để mang lại lợi nhuận tối ưu
              nhất?
            </ListItem>
          </UnorderedList>
          <Stack direction="row" alignItems="center">
            <Icon
              as={AiOutlineInfoCircle}
              sx={{ fontSize: "20px" }}
              color="green"
            />
            <Text sx={{ fontSize: "18px", fontWeight: 500 }}>Bạn có muốn:</Text>
          </Stack>
          <UnorderedList>
            <ListItem>
              Muốn khoản tiền tiết kiệm của mình sinh sôi nảy nở cao hơn tiền
              gửi ngân hàng?
            </ListItem>
            <ListItem>
              Muốn nghỉ hưu sớm hay tự do theo đuổi ước mơ của mình, không còn
              gánh nặng tiền bạc?
            </ListItem>
            <ListItem>
              Muốn dự đoán được khi nào cổ phiếu tăng hay giảm, nên mua hay nên
              bán?
            </ListItem>
            <ListItem>
              Muốn có một cái nhìn tổng quan về TTCK trong ngắn hạn và dài
              hạn...
            </ListItem>
          </UnorderedList>
          <Text sx={{ fontSize: "16px", fontWeight: 700 }}>
            Vậy thì đây là giải pháp chính xác nhất dành cho bạn lúc này!
          </Text>
        </Stack>
        {_renderFirstBox()}
        <Text
          sx={{
            fontSize: "28px",
            color: "#2984a6",
            fontWeight: 700,
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Nội dung khóa học
        </Text>
        <Text
          sx={{
            fontSize: "16px",
            color: "#a0a0a0",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Các chủ đề chính sẽ được trình bày trong Khóa học.
        </Text>
        <Text sx={{ marginTop: "30px" }}>
          Do mỗi chúng ta đều làm ở các lĩnh vực khác nhau, <b>Anh Tuấn</b> luôn
          chào đón và sẵn sàng giúp đỡ Nhà đầu tư trong lĩnh vực chứng khoán,
          bằng tất cả kinh nghiệm, kiến thức Cường đã được trang bị, tích luỹ
          trong hơn 10 năm thực tế trên thị trường. <b>Anh Tuấn</b> luôn sẵn
          sàng chia sẻ để Nhà đầu tư có được những kiến thức cơ bản cho đến nâng
          cao và cần thiết nhất để đầu tư hiệu quả.
        </Text>
        <Text>Khóa học chứng khoán của Anh Tuấn bao gồm 4 phần chính:</Text>
        <OrderedList>
          <ListItem>
            <b>Giới thiệu về Chứng khoán cơ sở:</b>
            <UnorderedList>
              <ListItem>Chứng khoán cơ bản</ListItem>
              <ListItem>Các vấn đề về cổ tức</ListItem>
              <ListItem>Giao dịch ký quỹ & cách quản trị rủi ro</ListItem>
              <ListItem>Các vấn đề về quỹ ETFs</ListItem>
              <ListItem>
                Chỉ số VN-Index và những cổ phiếu trụ của thị trường
              </ListItem>
              <ListItem>
                Giới thiệu về phân tích cơ bản, cách đọc báo cáo tài chính
              </ListItem>
              <ListItem>
                Ý nghĩa của các chỉ số cơ bản thường dùng, mối liên hệ giữa TTCK
                với các chỉ số vĩ mô
              </ListItem>
              <ListItem>Các phương pháp định giá cổ phiếu</ListItem>
              <ListItem>
                Các &quot;từ lóng&quot; và thuật ngữ mà dân chứng khoán thường
                sử dụng
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <b>Phân tích kỹ thuật</b>
            <UnorderedList>
              <ListItem>Tổng quan về Phân tích kỹ thuật</ListItem>
              <ListItem>Kênh xu thế</ListItem>
              <ListItem>Các mô hình</ListItem>
              <ListItem>Các chỉ báo indicator, market timming</ListItem>
              <ListItem>Nến Nhật...</ListItem>
              <ListItem>
                Hướng dẫn sử dụng phần mềm phân tích kỹ thuật Amibroker,
                Fireant...
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <b>Các công cụ, phương pháp đầu tư hiệu quả nhất hiện nay</b>
            <UnorderedList>
              <ListItem>
                Phương pháp đầu tư theo RS Rating, tính toán thành tích về giá
                cổ phiếu so với phần còn lại thị trường. Thời điểm mua, thời
                điểm bán (market timming) của thị trường và của từng mã cổ phiếu
              </ListItem>
              <ListItem>Phương pháp đầu tư xu hướng</ListItem>
              <ListItem>Phân tích cơ bản theo đồ thị trực quan</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <b>Q&A</b>
          </ListItem>
        </OrderedList>
        <Text>
          Những buổi học này sẽ được lồng ghép bởi những câu chuyện chứng khoán
          thực tế để cho Nhà Đầu Tư hiểu rõ hơn về bức tranh TTCK Việt Nam hiện
          tại. Sau khóa học Nhà Đầu Tư có thể tự tin và có những nền tảng kiến
          thức cơ bản nhất để bước chân vào lĩnh vực đầu tư chuyên nghiệp.
        </Text>
        <Text sx={{ fontStyle: "italic" }}>
          * Thời gian và điạ điểm Cường sẽ thông báo chi tiết đến từng Học viên
          tham gia đăng ký.
        </Text>
        <Text sx={{ fontStyle: "italic" }}>
          * Trang bị yêu cầu của khóa học: Laptop và sổ ghi chép.
        </Text>
        {_renderSecondBox()}
        <Text
          sx={{
            fontSize: "28px",
            color: "#2984a6",
            fontWeight: 700,
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Đối tượng
        </Text>
        <Text
          sx={{
            fontSize: "16px",
            color: "#a0a0a0",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Những ai nên theo học khóa đào tạo này?
        </Text>
        <List spacing={3}>
          <ListItem sx={{ display: "flex", alignItems: "center" }} role="group">
            <Box
              boxSize={8}
              sx={{
                background: "#32c15b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                borderRadius: "50%",
                border: "2px solid #ffffff",
                zIndex: "1",
              }}
              _groupHover={{
                transform: "rotate(360deg)",
                transition: "all ease 0.25s",
              }}
            >
              1
            </Box>
            <Text
              sx={{
                background: "#f4f4f4",
                padding: "10px 10px 10px 20px",
                width: "calc(100% + 10px)",
                borderRadius: "4px",
                transform: "translateX(-15px)",
              }}
            >
              Nhà đầu tư mới chưa biết bắt đầu từ đâu, đầu tư như thế nào?
            </Text>
          </ListItem>
          <ListItem sx={{ display: "flex", alignItems: "center" }} role="group">
            <Box
              boxSize={8}
              sx={{
                background: "#32c15b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                borderRadius: "50%",
                border: "2px solid #ffffff",
                zIndex: "1",
              }}
              _groupHover={{
                transform: "rotate(360deg)",
                transition: "all ease 0.25s",
              }}
            >
              2
            </Box>
            <Text
              sx={{
                background: "#f4f4f4",
                padding: "10px 10px 10px 20px",
                width: "calc(100% + 10px)",
                borderRadius: "4px",
                transform: "translateX(-15px)",
              }}
            >
              Người có tiền, đang gửi tiết kiệm hoặc đang đầu tư không hiệu quả
            </Text>
          </ListItem>
          <ListItem sx={{ display: "flex", alignItems: "center" }} role="group">
            <Box
              boxSize={8}
              sx={{
                background: "#32c15b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                borderRadius: "50%",
                border: "2px solid #ffffff",
                zIndex: "1",
              }}
              _groupHover={{
                transform: "rotate(360deg)",
                transition: "all ease 0.25s",
              }}
            >
              3
            </Box>
            <Text
              sx={{
                background: "#f4f4f4",
                padding: "10px 10px 10px 20px",
                width: "calc(100% + 10px)",
                borderRadius: "4px",
                transform: "translateX(-15px)",
              }}
            >
              Người bắt đầu hoặc chuẩn bị tham gia vào TTCK
            </Text>
          </ListItem>
          <ListItem sx={{ display: "flex", alignItems: "center" }} role="group">
            <Box
              boxSize={8}
              sx={{
                background: "#32c15b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                borderRadius: "50%",
                border: "2px solid #ffffff",
                zIndex: "1",
              }}
              _groupHover={{
                transform: "rotate(360deg)",
                transition: "all ease 0.25s",
              }}
            >
              4
            </Box>
            <Text
              sx={{
                background: "#f4f4f4",
                padding: "10px 10px 10px 20px",
                width: "calc(100% + 10px)",
                borderRadius: "4px",
                transform: "translateX(-15px)",
              }}
            >
              Những nhà đầu tư cá nhân mới tham gia thị trường chưa có kiến thức
              kinh nghiệm đầu tư
            </Text>
          </ListItem>
          <ListItem sx={{ display: "flex", alignItems: "center" }} role="group">
            <Box
              boxSize={8}
              sx={{
                background: "#32c15b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                borderRadius: "50%",
                border: "2px solid #ffffff",
                zIndex: "1",
              }}
              _groupHover={{
                transform: "rotate(360deg)",
                transition: "all ease 0.25s",
              }}
            >
              5
            </Box>
            <Text
              sx={{
                background: "#f4f4f4",
                padding: "10px 10px 10px 20px",
                width: "calc(100% + 10px)",
                borderRadius: "4px",
                transform: "translateX(-15px)",
              }}
            >
              Những nhà đầu tư tham gia lâu trên thị trường nhưng hiệu quả đầu
              tư thấp hoặc thậm chí là thua lỗ do không có chiến lược đúng
            </Text>
          </ListItem>
          <ListItem sx={{ display: "flex", alignItems: "center" }} role="group">
            <Box
              boxSize={8}
              sx={{
                background: "#32c15b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                borderRadius: "50%",
                border: "2px solid #ffffff",
                zIndex: "1",
              }}
              _groupHover={{
                transform: "rotate(360deg)",
                transition: "all ease 0.25s",
              }}
            >
              6
            </Box>
            <Text
              sx={{
                background: "#f4f4f4",
                padding: "10px 10px 10px 20px",
                width: "calc(100% + 10px)",
                borderRadius: "4px",
                transform: "translateX(-15px)",
              }}
            >
              Những nhà đầu tư không hiểu lý do một cổ phiếu tăng giá, không
              biết cách phân tích và hiểu rõ doanh nghiệp
            </Text>
          </ListItem>
          <ListItem sx={{ display: "flex", alignItems: "center" }} role="group">
            <Box
              boxSize={8}
              sx={{
                background: "#32c15b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                borderRadius: "50%",
                border: "2px solid #ffffff",
                zIndex: "1",
              }}
              _groupHover={{
                transform: "rotate(360deg)",
                transition: "all ease 0.25s",
              }}
            >
              7
            </Box>
            <Text
              sx={{
                background: "#f4f4f4",
                padding: "10px 10px 10px 20px",
                width: "calc(100% + 10px)",
                borderRadius: "4px",
                transform: "translateX(-15px)",
              }}
            >
              Những nhà đầu tư không có nhiều thời gian và muốn tìm một phương
              pháp đầu tư đơn giản hiệu quả và không ảnh hưởng đến công việc
              hàng ngày
            </Text>
          </ListItem>
          <ListItem sx={{ display: "flex", alignItems: "center" }} role="group">
            <Box
              boxSize={8}
              sx={{
                background: "#32c15b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                borderRadius: "50%",
                border: "2px solid #ffffff",
                zIndex: "1",
              }}
              _groupHover={{
                transform: "rotate(360deg)",
                transition: "all ease 0.25s",
              }}
            >
              8
            </Box>
            <Text
              sx={{
                background: "#f4f4f4",
                padding: "10px 10px 10px 20px",
                width: "calc(100% + 10px)",
                borderRadius: "4px",
                transform: "translateX(-15px)",
              }}
            >
              Những người muốn học tư duy đầu tư như những nhà đầu tư chuyên
              nghiệp
            </Text>
          </ListItem>
          <ListItem sx={{ display: "flex", alignItems: "center" }} role="group">
            <Box
              boxSize={8}
              sx={{
                background: "#32c15b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                borderRadius: "50%",
                border: "2px solid #ffffff",
                zIndex: "1",
              }}
              _groupHover={{
                transform: "rotate(360deg)",
                transition: "all ease 0.25s",
              }}
            >
              9
            </Box>
            <Text
              sx={{
                background: "#f4f4f4",
                padding: "10px 10px 10px 20px",
                width: "calc(100% + 10px)",
                borderRadius: "4px",
                transform: "translateX(-15px)",
              }}
            >
              Và tất cả những ai muốn tăng thu nhập của mình.
            </Text>
          </ListItem>
        </List>
      </Stack>
    );
  };

  return <CourseLayout>{_renderMain()}</CourseLayout>;
}
