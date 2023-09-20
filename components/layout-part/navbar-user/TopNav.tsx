import {
  Button,
  Container,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { auth } from "@/config";
import { useAuthState } from "react-firebase-hooks/auth/";
import LoginForm from "../Login";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillYoutube,
  AiFillMail,
  AiFillPhone,
} from "react-icons/ai";
import Image from "next/image";

export const TopNav: React.FC<any> = () => {
  const [user, setUser] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    if (sessionStorage.getItem("user") != null) onClose();
  };

  return (
    <Flex
      sx={{
        backgroundColor: "#f5f5f5",
        width: "100%",
        padding: "3px 0",
      }}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <LoginForm onClick={handleClose} />
        </ModalContent>
      </Modal>

      <Container
        maxW="1200px"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <Text
            sx={{
              fontWeight: 600,
              fontSize: "14px",
            }}
            color={"#5b7e9e"}
          >
            Mobile / Zalo:{" "}
            <span
              style={{
                color: "red",
                fontWeight: 700,
              }}
            >
              0788 669 289
            </span>
          </Text>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Stack direction="row" alignItems="center">
            <Link
              href=""
              target="_blank"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Image src="/tik-tok.png" alt="Tiktok" width={14} height={14} />
            </Link>
            <Link
              href=""
              target="_blank"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Icon as={AiFillYoutube} />
            </Link>
            <Link
              href=""
              target="_blank"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Icon as={AiFillFacebook} />
            </Link>
            <Link
              href=""
              target="_blank"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Icon as={AiFillMail} />
            </Link>
            <Link
              href=""
              target="_blank"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Icon as={AiFillPhone} />
            </Link>
          </Stack>
          {!user || !sessionStorage.getItem("user") ? (
            <Button
              height={6}
              colorScheme="teal"
              variant={"solid"}
              onClick={onOpen}
            >
              <Text
                sx={{
                  fontSize: 12,
                }}
              >
                Login
              </Text>
            </Button>
          ) : (
            <>
              <Text
                sx={{
                  color: "#409c35",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                {" "}
                Hi: {user?.displayName || sessionStorage.getItem("user")}
              </Text>
              <Button
                height={6}
                colorScheme="teal"
                variant={"solid"}
                onClick={() => {
                  auth.signOut();
                  sessionStorage.clear();
                }}
              >
                <Text
                  sx={{
                    fontSize: 12,
                  }}
                >
                  Logout
                </Text>
              </Button>
            </>
          )}
        </Stack>
      </Container>
    </Flex>
  );
};
