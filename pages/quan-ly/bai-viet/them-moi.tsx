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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import initFullProps from "@/components/common/TextEditor/initFullProps";
import { ImageUpload } from "@/components/common/Input/ImageUpload";
import { AiOutlineRedo, AiOutlineSave, AiOutlineDelete } from "react-icons/ai";
import { categories } from "@/constants/categoryPost";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

interface IPayloadProps {
  title: string;
  desc: string;
  image: string;
  category: string;
  content: string;
  createdAt: Date;
  updatetedAt: Date;
  comments: any[];
  view: number;
  like: string[];
}

const DEFAULT_PAYLOAD = {
  title: "",
  desc: "",
  image: "",
  category: "",
  content: "",
  createdAt: new Date(),
  updatetedAt: new Date(),
  comments: [],
  view: 0,
  like: [],
};

export default function CreatePost() {
  const [content, setContent] = useState<string>("");
  const [payload, setPayload] = useState<IPayloadProps>(DEFAULT_PAYLOAD);
  const [imageFile, setImageFile] = useState<File | null>(); // New state variable
  const [imagePreview, setImagePreview] = useState<any>(); // New state variable
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const notifySuccess = () => toast.success("Tạo bài viết thành công!");
  const notifyError = (err: any) => toast.error(err);

  const postsColectionRef = collection(firestore, "posts");
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setPayload({
      ...payload,
      content,
    });
  }, []);

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
    setPayload((prevPayload) => ({
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
    if (imageFile === null) alert("null image file");
    const imageRef = ref(storage, `images/${imageFile?.name + v4()}`);
    imageFile &&
      uploadBytes(imageRef, imageFile).then(async (res) => {
        const downloadURL = await getDownloadURL(imageRef);
        setPayload({
          ...payload,
          image: downloadURL,
        });
      });
  };

  const handleSetNullImageFile = () => {
    setImageFile(null);
    setImagePreview("");
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
      // No errors, proceed with saving
      setIsLoading(true);
      await uploadImage();
    }
  };

  const handleCreateDoc = useCallback(async () => {
    const slug = convertToSlug(payload.title);
    await addDoc(postsColectionRef, { ...payload, slug })
      .then(() => {})
      .catch((error) => {
        notifyError(error);
      })
      .finally(() => {
        setIsLoading(false);
        notifySuccess();
      });
  }, [payload, postsColectionRef]);
  useEffect(() => {
    if (isLoading && payload.image != "") {
      handleCreateDoc();
    }
  }, [handleCreateDoc, isLoading, content, payload]);

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
              Tạo Bài Viết Mới
            </Text>
            <Text as={"b"} fontSize={24}>
              Tiêu đề
            </Text>
            <Box>
              <Input
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
            {imagePreview ? (
              <Stack
                sx={{
                  position: "relative",
                }}
              >
                <Image
                  boxSize="100%"
                  height={400}
                  objectFit="contain"
                  src={imagePreview}
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
                value={content}
                apiKey={"i4rwm87h4qr1rnnpjmpliozd86qa65v89r680jfji0ls6sj5"}
                onInit={(evt, editor) => {
                  editorRef.current = editor;
                }}
                onEditorChange={handleEditorChange}
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
              onClick={() => handelReset()}
              rightIcon={<AiOutlineRedo />}
              width={100}
              colorScheme="orange"
              variant="outline"
            >
              Reset
            </Button>
            <Button
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
