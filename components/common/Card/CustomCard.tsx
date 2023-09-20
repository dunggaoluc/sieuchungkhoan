import {
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Button,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

interface ICardProps {
  title: string;
  id: string;
  desc: string;
  image?: string;
  sx?: any;
  onClick?: any;
  onClickRemove?: any;
}

const CustomCard: React.FC<ICardProps> = ({
  title,
  desc,
  image,
  id,
  sx,
  onClick,
  onClickRemove,
}) => {
  if (onclick) onclick;
  if (onClickRemove) onClickRemove;
  return (
    <Card
      sx={{
        ...sx,
      }}
      key={id}
      maxW="sm"
    >
      <CardBody>
        {image ? (
          <Image
            height={300}
            w={"100%"}
            objectFit={"cover"}
            src={image}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
        ) : null}
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text
            sx={{
              fontSize: 14,
              width: "100%",
              overflow: "hidden",
              display: "inline-block",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {desc}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button onClick={onClick} variant="solid" colorScheme="orange">
            Cập nhật
          </Button>
          <Button onClick={onClickRemove} variant="ghost" colorScheme="red">
            Xoá bài viết
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
