import { UserLayout } from "@/components/default-layout";
import { auth } from "@/config";
import { login } from "@/firebase/auth/signin";
import { getPostBySlug, updatePost } from "@/firebase/firestore/postsStore";
import {
  Button,
  Flex,
  Image,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { FacebookIcon, FacebookShareButton } from "next-share";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineArrowRight, AiFillLike, AiOutlineUser } from "react-icons/ai";
export default function DetailsPost() {
  const [post, setPost] = useState<any>({
    id: "",
    title: "",
    desc: "",
    content: "",
    view: 0,
    like: [],
    comments: [
      {
        user: "",
        content: "",
      },
    ],
  });
  const router = useRouter();

  const [user, setUser] = useAuthState(auth);
  const [comment, setComment] = useState<string>("");
  const [listComments, setListComments] = useState<any>();
  const [postId, setPostId] = useState<string>(router?.query?.id as string);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCommentLoading, setListCommentLoading] = useState<boolean>(false);

  const getPost = async (id: string) => {
    setIsLoading(true);
    if (id) {
      const post = await getPostBySlug(id)
        .then()
        .finally(() => {
          setIsLoading(false);
        });
      if (post)
        setPost({
          ...post,
          view: post?.view + 1,
        });
      else router.push("/");
    }
  };

  const update = async () => {
    setListCommentLoading(true);
    if (user == null) return login();
    if (comment == "") alert("Please enter a comment");
    else {
      const commentPayload: any[] = post?.comments || [];
      commentPayload?.push({
        user: user?.email,
        content: comment,
      });
      setListComments(commentPayload);
      setPost({
        ...post,
        comments: listComments,
      });
      await updatePost(post.id, post)
        .then(() => {
          getPost(post.id);
        })
        .finally(() => {
          setIsLoading(false);
          setListCommentLoading(false);
          setComment("");
        });
    }
  };

  const handleComment = (e: any) => {
    setComment(e.target.value);
    console.log(e.target.value);
  };

  const handleLike = async () => {
    if (sessionStorage?.getItem("user") == null) {
      login();
    } else {
      const likes: any[] = post.like;
      likes.push(sessionStorage?.getItem("user") as string);
      setPost({
        ...post,
        like: likes,
      });
      await updatePost(post.id, post);
    }
  };

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

  useEffect(() => {
    if (post.id) updatePost(post.id, post);
  }, [post?.view]);

  useEffect(() => {
    getPost(router?.query?.id as string);
  }, [router]);

  useEffect(() => {
    setPostId(router?.query?.id as string);
  }, [postId]);

  useEffect(() => {
    if (postId) getPost(postId);
  }, [router]);

  const _renderDetail = () => {
    return (
      <Flex
        sx={{
          flexDirection: "column",
          marginTop: 2,
        }}
      >
        <Text
          sx={{
            color: "#2d6c9a",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          {isLoading === true ? <Skeleton height="20px" /> : post?.title}
        </Text>
        <Text
          sx={{
            color: "rgba(0,0,0,0.7)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Lượt xem: {post?.view || 0}
        </Text>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            height: 10,
            alignItems: "center",
          }}
        >
          <Stack>
            <Button
              isDisabled={
                post.like != 0 &&
                post?.like?.includes(sessionStorage?.getItem("user"))
              }
              onClick={() => handleLike()}
              sx={{
                display: "flex",
                width: 100,
                height: 8,
              }}
            >
              <Text
                sx={{
                  color: "#5b7e9e",
                  fontSize: "14px",
                }}
              >
                Like
              </Text>
              <AiFillLike fontSize={18} color="#5b7e9e" /> :
              <Text sx={{ fontSize: "14px" }}>{post?.like?.length || 0}</Text>
            </Button>
          </Stack>
          <FacebookShareButton
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            url={process.env.NEXT_PUBLIC_WEB_APP_URL as string}
            quote={
              "next-share is a social share buttons for your next React apps."
            }
            hashtag={"#nextshare"}
          >
            <FacebookIcon size={18} round />
            <Text
              sx={{
                fontWeight: "bold",
                marginLeft: "6px",
                fontSize: "14px",
              }}
              color={"#5b7e9e"}
            >
              Chia sẻ : {post?.share || 0}
            </Text>
          </FacebookShareButton>
        </Stack>

        <Stack
          sx={{
            padding: "0 5px",
            width: "100%",
            height: "100%", // Set height to 100%
          }}
        >
          <div
            style={{
              color: "black",
              height: "100%", // Set height to 100%
              width: "100%", // Set width to 100%
              fontSize: "14px",
            }}
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
        </Stack>
      </Flex>
    );
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      update();
    }
  };

  const _renderComments = () => {
    if (!post?.comments || post?.comments.length === 0) {
      return (
        <>
          <Textarea
            onKeyDown={handleKeyDown}
            onChange={(e) => handleComment(e)}
            placeholder="Enter your comment..."
            sx={{ resize: "vertical", marginBottom: 2, fontSize: "14px" }}
          />
          <Button
            isLoading={isCommentLoading}
            onClick={() => update()}
            colorScheme="blue"
            size="sm"
            sx={{ fontSize: "14px" }}
          >
            Send Comment
          </Button>
        </>
      ); // Don't render anything if comments don't exist
    }

    return (
      <Flex
        sx={{
          paddingTop: 2,
          flexDirection: "column",
          marginTop: 4,
          border: "solid 1px #ccc",
          padding: 2,
          borderRadius: 4,
        }}
      >
        <Text
          sx={{
            color: "#2d6c9a",
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 2,
            borderBottom: "solid 1px #ccc",
            paddingBottom: 2,
          }}
        >
          Comments
        </Text>
        {post.comments.map((comment: any, index: number) => (
          <Flex
            key={index}
            sx={{
              flexDirection: "row",
              marginBottom: 3,
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <AiOutlineUser
              style={{
                fontSize: 20,
                border: "solid 1px #000",
                borderRadius: "50%",
              }}
            />

            <Stack
              sx={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                padding: 1,
                borderRadius: 12,
              }}
            >
              <Text
                sx={{
                  fontSize: 14,
                  color: "#5b7e9e",
                  fontWeight: 600,
                  borderBottom: "solid 1px #ccc",
                }}
              >
                {comment.user}
              </Text>
              <Text
                sx={{
                  width: "100%",
                }}
              >
                {comment.content}
              </Text>
            </Stack>
          </Flex>
        ))}

        {/* Text area and button to add new comment */}
        <Textarea
          value={comment}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleComment(e)}
          placeholder="Enter your comment..."
          sx={{ resize: "vertical", marginBottom: 2, fontSize: "14px" }}
        />
        <Flex
          sx={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            sx={{
              fontSize: "14px",
              width: "10rem",
            }}
            isLoading={isCommentLoading}
            onClick={() => update()}
            colorScheme="blue"
            size="sm"
          >
            Send Comment
          </Button>
        </Flex>
      </Flex>
    );
  };

  const _renderMain = () => {
    return (
      <>
        {_renderBreadcrumbs()}
        <Image src="https://dautucophieu.net/wp-content/themes/dautucophieu/images/dau-tu-co-phieu-facebook-group.jpg" />
        {_renderDetail()}
        {_renderComments()}
      </>
    );
  };

  return (
    <UserLayout isDetail title={post?.title || "Siêu chứng khoán"}>
      {_renderMain()}
    </UserLayout>
  );
}
