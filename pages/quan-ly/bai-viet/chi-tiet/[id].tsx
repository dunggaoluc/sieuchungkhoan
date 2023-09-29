import { AdminLayout } from "@/components/default-layout";
import { firestore, storage } from "@/config";
import {
  Box,
  Container,
  GridItem,
  SimpleGrid,
  Input,
  Textarea,
  Text,
  Button,
  Select,
  Image,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import initFullProps from "@/components/common/TextEditor/initFullProps";
import { ImageUpload } from "@/components/common/Input/ImageUpload";
import { AiOutlineRedo, AiOutlineSave, AiOutlineDelete } from "react-icons/ai";
import { categories } from "@/constants/categoryPost";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const DEFAULT_PAYLOAD = {
  title: "",
  desc: "",
  image: "",
  category: "",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function EditPost() {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [payload, setPayload] = useState<any>(DEFAULT_PAYLOAD);
  const [imageFile, setImageFile] = useState<File | null>(); // New state variable
  const [imagePreview, setImagePreview] = useState<any>(); // New state variable
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idPost, setIdPost] = useState<string>("");
  const notifySuccess = () => toast.success("Cập nhật bài viết thành công!");
  const notifyError = (err: any) => toast.error(err);
  const editorRef = useRef<any>(null);
  const getPost = async () => {
    const postsCollectionRef = doc(firestore, "posts", idPost);
    try {
      const docSnap = await getDoc(postsCollectionRef);
      const data = await docSnap.data();
      setImageFile(data?.image);
      const newPayload = {
        id: idPost,
        title: data?.title,
        content: data?.content,
        desc: data?.desc,
        image: data?.image,
        category: data?.category,
      };
      setPayload(newPayload);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (idPost) {
      getPost();
    }
  }, [idPost]);

  useEffect(() => {
    setIdPost(router.query.id + "");
  }, [router.query.id]);

  const convertToSlug = (text: string) => {
    let str = text.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const handleChangeInput = (e: any, name: string) => {
    const value = e.target.value;
    if (payload.content.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required.",
      }));
    }
    setPayload((prevPayload: any) => ({
      ...prevPayload,
      [name]: value,
    }));

    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
        content: "",
      }));
    }
  };

  const handelReset = () => {
    setPayload(DEFAULT_PAYLOAD), setImageFile(null);
    setContent("");
    setImagePreview("");
  };

  const handleImageChange = (file: File) => {
    setImageFile(file);
    const createPreviewFile = URL.createObjectURL(file);
    setImagePreview(createPreviewFile);
  };

  const uploadImage = async () => {
    if (imageFile === null || imageFile === undefined) alert("null image file");
    const imageRef = await ref(storage, `images/${imageFile?.name + v4()}`);
    imageFile &&
      (await uploadBytes(imageRef, imageFile).then(async (res) => {
        return await setPayload({
          ...payload,
          image: await getDownloadURL(imageRef),
        });
      }));
  };

  const updatePost = async () => {
    const slug = convertToSlug(payload.title);
    const docRef = doc(firestore, "posts", router.query.id + "");
    await updateDoc(docRef, { ...payload, slug });
  };
  // useEffect(() => {
  //   updatePost();
  // }, [payload]);

  const handleSetNullImageFile = () => {
    setImageFile(null);
    setImagePreview("");
    setPayload({
      ...payload,
      image: "",
    });
  };

  const handleSavePost = async () => {
    const { title, desc, image, content, category } = payload;
    const updatedErrors: any = {};

    if (title.trim() === "") {
      updatedErrors.title = "Title field is required.";
    }

    if (desc.trim() === "") {
      updatedErrors.desc = "Description field is required.";
    }

    if (imageFile === null) {
      updatedErrors.image = "Image field is required.";
    }

    if (content.trim() === "") {
      updatedErrors.content = "Content field is required.";
    }

    if (category.trim() === "") {
      updatedErrors.content = "Category field is required.";
    }

    setErrors(updatedErrors);

    if (Object.keys(updatedErrors).length === 0) {
      setIsLoading(true);
      if (imageFile && imageFile?.name)
        try {
          await uploadImage();
        } catch (error) {
          console.log(error);
        }
      else
        updatePost()
          .then(() => {})
          .catch((error) => {
            notifyError(error);
          })
          .finally(() => {
            setIsLoading(false);
            getPost();
            notifySuccess();
          });
    }
  };

  useEffect(() => {
    if (isLoading && payload.image != "") {
      updatePost()
        .then(() => {})
        .catch((error) => {
          notifyError(error);
        })
        .finally(() => {
          setIsLoading(false);
          getPost();
          notifySuccess();
        });
    }
  }, [payload]);

  const handleEditorChange = (content: string) => {
    // Validate the content field
    if (content.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        content: "Content field is required.",
      }));
    } else {
      setPayload({
        ...payload,
        content: content,
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        content: "",
      }));
    }
    setContent(content);
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
        <div
          style={{
            width: "2000px",
          }}
        >
          <ToastContainer />
        </div>
        <SimpleGrid spacing={2} columns={1} row={2}>
          <SimpleGrid
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text as={"b"} fontSize={28}>
              Cập nhật bài viết
            </Text>
            <Text as={"b"} fontSize={24}>
              Tiêu đề
            </Text>
            <Box>
              <Input
                isDisabled={isLoading}
                value={payload?.title}
                isRequired
                placeholder={"Enter title in here"}
                color="#000"
                name="title"
                onChange={(e) => handleChangeInput(e, "title")}
              />
              {errors.title && (
                <Text fontSize={12} color="red">
                  {errors.title}
                </Text>
              )}
            </Box>
            <Text as={"b"} fontSize={20}>
              Mô tả
            </Text>
            <Textarea
              isDisabled={isLoading}
              value={payload?.desc}
              name="desc"
              onChange={(e) => handleChangeInput(e, "desc")}
              placeholder="Here is a sample placeholder"
            />
            {errors.desc && (
              <Text fontSize={12} color="red">
                {errors.desc}
              </Text>
            )}

            <Text as={"b"} fontSize={20}>
              Hình ảnh
            </Text>
            {imagePreview || payload.image ? (
              <Stack
                sx={{
                  position: "relative",
                }}
              >
                <Image
                  boxSize="100%"
                  height={400}
                  objectFit="contain"
                  src={imagePreview || payload.image}
                  alt="Dan Abramov"
                />
                <AiOutlineDelete
                  onClick={() => handleSetNullImageFile()}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    fontSize: 34,
                  }}
                />
              </Stack>
            ) : (
              <ImageUpload onChange={handleImageChange} />
            )}

            {errors.image && (
              <Text fontSize={12} color="red">
                {errors.image}
              </Text>
            )}
            <Box>
              <Text color="#000" />
            </Box>
            <Box
              sx={{
                zIndex: 4,
              }}
            >
              <Text as={"b"} fontSize={20}>
                Chủ đề
              </Text>
              <Select
                isDisabled={isLoading}
                value={payload?.category}
                onChange={(e) => handleChangeInput(e, "category")}
                placeholder="Chủ đề"
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
              {errors.category && (
                <Text fontSize={12} color="red">
                  {errors.category}
                </Text>
              )}
            </Box>
            <Box height={"auto"} width={"100%"}>
              <Editor
                disabled={isLoading}
                value={payload.content}
                apiKey={"rc87z8c8ebkg8ydsc0zrtj7ory5ob9ta4jahomago8a09eg2"}
                onInit={(evt, editor) => {
                  editorRef.current = editor;
                }}
                onEditorChange={handleEditorChange}
                // initialValue="<p>This is the initial content of the editor.</p>"
                init={initFullProps}
              />
              {errors.content && (
                <Text fontSize={12} color="red">
                  {errors.content}
                </Text>
              )}
            </Box>
          </SimpleGrid>

          <GridItem
            sx={{
              marginBottom: 24,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              isDisabled={isLoading}
              onClick={() => handelReset()}
              rightIcon={<AiOutlineRedo />}
              width={100}
              colorScheme="orange"
              variant="outline"
            >
              Reset
            </Button>
            <Button
              isDisabled={isLoading}
              isLoading={isLoading}
              onClick={() => handleSavePost()}
              rightIcon={<AiOutlineSave />}
              width={100}
              colorScheme="green"
              variant="outline"
            >
              Save
            </Button>
          </GridItem>
        </SimpleGrid>
        {/* <div
          style={{
            color: "black",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        /> */}
      </Container>
    );
  };

  return <AdminLayout>{_renderMain()}</AdminLayout>;
}
