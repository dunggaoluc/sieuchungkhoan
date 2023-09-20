import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PostManagement() {
  const router = useRouter();

  useEffect(() => {
    router.push("/quan-ly/bai-viet")
  }, []);
  return <></>;
}
