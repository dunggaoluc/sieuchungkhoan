import { auth } from "@/config";
import signIn, { login } from "@/firebase/auth/signin";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillGoogleCircle } from "react-icons/ai";

interface LoginFormState {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
}

export default function LoginForm(props: { onClick?(): void }) {
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
    errors: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const { onClick } = props;
  if (onClick) onClick();

  const validateForm = (): boolean => {
    const errors: LoginFormState["errors"] = {};
    // Validate email
    if (!formState.email) {
      errors.email = "Email address is required.";
    } else if (!isValidEmail(formState.email)) {
      errors.email = "Invalid email address.";
    }

    // Validate password
    if (!formState.password) {
      errors.password = "Password is required.";
    }

    setFormState((prevState: any) => ({
      ...prevState,
      errors,
    }));

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email: string): any => {
    const validateEmailRegex = /^\S+@\S+\.\S+$/;
    return validateEmailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      // Form is valid, proceed with login logic
      // Call your login function or API here
      await signIn(formState.email, formState.password)
        .then()
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const { value } = event.target;
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Flex
      sx={{
        borderRadius: 10,
      }}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                value={formState.email}
                onChange={(e) => handleInputChange(e, "email")}
                type="email"
              />
            </FormControl>
            {formState.errors.email && (
              <Text color="red">{formState.errors.email}</Text>
            )}
            <FormControl id="password">
              <FormLabel>Mật khẩu</FormLabel>
              <Input
                value={formState.password}
                onChange={(e) => handleInputChange(e, "password")}
                type="password"
              />
            </FormControl>
            {formState.errors.password && (
              <Text color="red">{formState.errors.password}</Text>
            )}
            <Stack>
              <Button
                isLoading={isLoading}
                onClick={() => handleSubmit()}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}>
                Đăng nhập
              </Button>
            </Stack>
            <Button
              onClick={() => login()}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                cursor: "pointer",
              }}
              rounded={"lg"}
              padding={6}
              boxShadow={"lg"}
              bg={useColorModeValue("white", "gray.700")}>
              <Text>Đăng nhập với Google</Text>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <AiFillGoogleCircle color="red" fontSize={24} />
              </Stack>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
