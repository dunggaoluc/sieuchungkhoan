import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Select from "../Select";
import {
  XCircleIcon,
  TruckIcon,
  ExclamationCircleIcon,
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import _ from "lodash";

interface IPayload {
  id: string;
  invoiceCode: string;
  address: string;
  city: string;
  district: string;
  email: string;
  name: string;
  note: string;
  paymentMethod: string;
  phone: string;
  products: {
    quantity: number;
    productId: string;
  }[];
  transportFee: number;
  ward: string;
  status: string;
  total: number;
}

interface IProps {
  payload: IPayload[];
  onChange(payload: { id: string; status: string }): void;
}

const statusOptions = [
  {
    label: "Chưa xác nhận",
    value: "unconfirmed",
    icon: <ExclamationCircleIcon className="w-5 h-5" />,
    color: "text-yellow-700",
    bgColor: "bg-yellow-300",
  },
  {
    label: "Đã xác nhận",
    value: "confirmed",
    icon: <ClipboardDocumentCheckIcon className="w-5 h-5" />,
    color: "text-cyan-700",
    bgColor: "bg-cyan-300",
  },
  {
    label: "Đang giao",
    value: "delivery",
    icon: <TruckIcon className="w-5 h-5" />,
    color: "text-blue-700",
    bgColor: "bg-blue-300",
  },
  {
    label: "Đã giao",
    value: "delivered",
    icon: <CheckBadgeIcon className="w-5 h-5" />,
    color: "text-green-700",
    bgColor: "text-bg-300",
  },
  {
    label: "Đã hủy",
    value: "cancelled",
    icon: <XCircleIcon className="w-5 h-5" />,
    color: "text-red-700",
    bgColor: "bg-red-300",
  },
];

const Table: React.FC<IProps> = ({ payload, onChange }) => {
  const onChangeStatus = async (id: string, status: string) => {
    if (onChange) onChange({ id, status });
  };

  return (
    <div className="w-full rounded-md shadow-md p-2 mt-2">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border-b font-bold px-2 pb-2 text-gray-700 text-center text-sm  text-">
              Mã đơn hàng
            </th>
            <th className="border-b font-bold px-2 pb-2 text-gray-700 text-center text-sm">
              Tên khách hàng
            </th>
            <th className="border-b font-bold px-2 pb-2 text-gray-700 text-center text-sm">
              Số điện thoại
            </th>
            <th className="border-b font-bold px-2 pb-2 text-gray-700 text-center text-sm">
              Tổng hóa đơn
            </th>
            <th className="border-b font-bold px-2 pb-2 text-gray-700 text-center text-sm">
              Trạng thái
            </th>
            <th className="border-b font-bold px-2 pb-2 text-gray-700 text-center text-sm">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {payload.length > 0 ? (
            payload.map((item: IPayload) => {
              return (
                <tr key={`item-${item.invoiceCode}`}>
                  <td className="border-b py-2 text-sm text-center">
                    {item.invoiceCode}
                  </td>
                  <td className="border-b py-2 text-sm">{item.name}</td>
                  <td className="border-b py-2 text-sm text-center">
                    {item.phone}
                  </td>
                  <td className="border-b py-2 text-sm text-center">
                    {item.total.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    }) || "0"}
                  </td>
                  <td className="border-b py-2 text-sm">
                    <Select
                      selected={item.status}
                      options={statusOptions}
                      onChange={(e: any) => onChangeStatus(item.id, e.value)}
                    />
                  </td>
                  <td className="text-sm border-b">
                    <div className="flex flex-row justify-center">
                      <Link href={`/quan-ly/don-hang/${item.id}`}>
                        <EyeIcon className="w-5 h-5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
