import { Button, Text } from "@chakra-ui/react";

interface IProps {
  children?: JSX.Element | string;
  onClick?(e: any): void;
  href?: string;
  className?: string;
  label: string;
}

const ButtonAdmin: React.FC<IProps> = ({
  href,
  onClick,
  children,
  className = "",
  label,
}) => {
  if (onClick) onClick;
  return (
    <Button
      width={"100px"}
      colorScheme="brand"
      color="#000"
      border={"1px solid black"}
      variant="outline"
      onClick={onClick}>
      <Text
        sx={{
          color: "rgb(55 65 81)",
        }}>
        {label}
      </Text>
    </Button>
  );
};
export default ButtonAdmin;
