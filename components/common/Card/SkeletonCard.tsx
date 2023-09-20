import { Skeleton, Stack } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Stack>
      <Skeleton height={300} />
      <Skeleton height="60px" />
      <Skeleton height="35px" />
    </Stack>
  );
};

export default SkeletonCard;
