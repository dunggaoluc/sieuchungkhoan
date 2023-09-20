import Image from "next/image";
import { News } from "../../../helper";
import sampleSize from "lodash/sampleSize";
import Link from "next/link";

interface IProps {
  excludeNews: string;
}

interface INews {
  label: string;
  path: string;
  thumbnail: string;
  description: string;
}

const RelatedNews: React.FC<IProps> = ({ excludeNews }) => {
  const filterNews = News.filter((item: INews) => item.path !== excludeNews);

  const randomNews = sampleSize(filterNews, 3);

  return (
    <>
      {randomNews.map((item: INews) => (
        <Link
          href={item.path}
          key={`news-${item.path}`}
          className="flex flex-row items-start mb-3"
        >
          <Image
            src={item.thumbnail}
            alt={item.label}
            width={150}
            height={150}
            className="w-28 aspect-square h-auto mr-2 object-cover object-center shadow-lg"
          />
          <h2 className="text-md font-semibold">{item.label}</h2>
        </Link>
      ))}
    </>
  );
};

export default RelatedNews;
