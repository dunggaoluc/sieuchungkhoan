import Link from "next/link";
import {
  ShoppingBagIcon,
  XCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../common";
import React from "react";
import { useCookies } from "react-cookie";

const navigation = [
  {
    label: "Giới thiệu",
    path: "/gioi-thieu",
  },
  {
    label: "Sản phẩm",
    path: "/san-pham",
  },
  {
    label: "Tin tức",
    path: "/tin-tuc",
  },
  {
    label: "Chính sách",
    path: "/chinh-sach",
  },
  {
    label: "Phản hồi",
    path: "/phan-hoi",
  },
];

interface IProduct {
  id: string;
  label: string;
  price: number;
  description: string;
  mainThumbnail: string;
  secondaryThumbnail: string;
  path: string;
}

const Header = () => {
  return <>header</>;
};

export default Header;
