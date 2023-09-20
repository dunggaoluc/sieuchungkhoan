import { CustomCard, SkeletonCard } from "@/components/common";
import { AdminLayout } from "@/components/default-layout";
import { firestore } from "@/config";
import { categories } from "@/constants/categoryPost";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineRollback,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PostManagement() {
  const [listPost, setListPost] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0].categoryName
  );
  const [filterByTitle, setFilterByTitle] = useState("");
  const [idPost, setIdPost] = useState("");
  const [limitPost, setLimitPost] = useState<number>(20);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  let postsCollectionRef = query(
    collection(firestore, "posts"),
    limit(limitPost)
  );

  const handleRemove = (id: string) => {
    const docRef = doc(firestore, "posts", id);
    deleteDoc(docRef)
      .then(() => {
        const newListPost = listPost.filter((item) => {
          return item.id != id;
        });
        setListPost(newListPost);
        onClose();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleReset = () => {
    setSelectedCategory("bao-cao-cua-anh-tuan");
    setFilterByTitle("");
  };

  useEffect(() => {
    setIsLoading(true);

    if (selectedCategory) {
      postsCollectionRef = query(
        postsCollectionRef,
        where("category", "==", selectedCategory)
      );
      const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        setListPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false);
      };
      getPosts();
    }
  }, [selectedCategory, limitPost]);

  const handleEdit = (id: string) => {
    router.push("/quan-ly/bai-viet/chi-tiet" + id);
  };

  useEffect(() => {
    setSelectedCategory("bao-cao-cua-anh-tuan");
  }, []);

  useEffect(() => {
    if (filterByTitle) {
      const startAt = filterByTitle;
      const endAt = filterByTitle + "\uf8ff";
      postsCollectionRef = query(
        postsCollectionRef,
        where("title", ">=", startAt),
        where("title", "<=", endAt)
      );
      const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        setListPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getPosts();
    }
  }, [filterByTitle, limitPost]);

  const handleItemRemove = (id: string) => {
    setIdPost(id);
    onOpen();
  };

  const _renderFilterParams = () => {
    return (
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          boxShadow: "0px 0px 20px 2px #ccc",
          padding: 4,
          borderRadius: 12,
          marginBottom: 6,
        }}
        spacing={3}
      >
        <Input
          onChange={(e) => setFilterByTitle(e.target.value)}
          placeholder="Tìm kiếm bằng tiêu đề bài viết"
          size="md"
        />
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(
            (category: { categoryName: string; value: string }) => {
              return (
                <option key={category.value} value={category.value}>
                  {category.categoryName}
                </option>
              );
            }
          )}
        </Select>
        <Button
          onClick={() => handleReset()}
          rightIcon={<AiOutlineRollback />}
          sx={{
            width: 200,
          }}
        >
          Xóa bộ lọc
        </Button>
        <Button
          onClick={() => handleReset()}
          rightIcon={<AiOutlinePlusCircle />}
          sx={{
            width: 200,
          }}
          as={Link}
          href="/quan-ly/bai-viet/them-moi"
        >
          Thêm mới
        </Button>
      </Stack>
    );
  };

  const _renderMain = () => {
    return (
      <Container
        sx={{
          marginTop: 2,
          marginBottom: 12,
        }}
        paddingLeft={"200px"}
        maxW="100vw"
      >
        <>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>Xoá bài viết?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Bạn có chắc chắn muốn xoá bài viết này
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Không
                </Button>
                <Button
                  onClick={() => handleRemove(idPost)}
                  colorScheme="red"
                  ml={3}
                >
                  Có
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
        <Stack
          sx={{
            marginTop: 4,
            marginBottom: 6,
          }}
        >
          <Text fontSize={24} as={"b"} variant={"h2"}>
            Quản lý bài viết
          </Text>
        </Stack>
        {_renderFilterParams()}
        {isLoading ? (
          <Flex
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              gap: 2,
            }}
          >
            {Array.from(
              [1, 2, 3, 4, 5, 6, 7, 9, 10, 11].map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      width: "303px",
                    }}
                  >
                    <SkeletonCard />
                  </Box>
                );
              })
            )}
          </Flex>
        ) : listPost.length === 0 ? (
          <Text textAlign={"center"}>Không tìm thấy dữ liệu!</Text>
        ) : (
          <Flex
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              gap: 4,
            }}
          >
            {listPost &&
              listPost.map((post: any) => {
                return (
                  <CustomCard
                    onClickRemove={() => handleItemRemove(post.id)}
                    onClick={() => handleEdit(post.id)}
                    sx={{
                      width: "302px",
                    }}
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    desc={post.desc}
                    image={post.image}
                  />
                );
              })}
          </Flex>
        )}

        <Stack
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            isDisabled={limitPost == 20}
            onClick={() => setLimitPost(limitPost - 20)}
            rightIcon={<AiFillCaretLeft />}
            width={200}
          />
          <Button
            isDisabled={limitPost > listPost?.length}
            onClick={() => setLimitPost(limitPost + 20)}
            rightIcon={<AiFillCaretRight />}
            width={200}
          ></Button>
        </Stack>
      </Container>
    );
  };
  return <AdminLayout>{_renderMain()}</AdminLayout>;
}
