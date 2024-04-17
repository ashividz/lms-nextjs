"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import { Order } from "@prisma/client";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatDate";
import { formatOrderId } from "@/lib/formatOrderId";
type PaymentStatus = "Cancelled" | "Paid" | "Failed" | "Processing";
export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          OrderId
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as string;

      return <Badge className="bg-sky-500">{formatOrderId(id)}</Badge>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;

      return <Badge className="bg-slate-500">{formatDate(createdAt)}</Badge>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const paymentStatus: PaymentStatus = row.getValue(
        "paymentStatus"
      ) as PaymentStatus;

      return (
        <Badge
          className={cn(
            "bg-slate-500",
            paymentStatus === "Cancelled" && "bg-sky-700",
            paymentStatus === "Paid" && "bg-emerald-700",
            paymentStatus === "Failed" && "bg-red-700",
            paymentStatus === "Processing" && "bg-pink-700"
          )}
        >
          {paymentStatus}
        </Badge>
      );
    },
  },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => {
  //       const { id } = row.original;

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-4 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <Link href={`/admin/faculties/${id}`}>
  //               <DropdownMenuItem>
  //                 <Pencil className="h-3 w-3 mr-2" />
  //                 Edit
  //               </DropdownMenuItem>
  //             </Link>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
];
