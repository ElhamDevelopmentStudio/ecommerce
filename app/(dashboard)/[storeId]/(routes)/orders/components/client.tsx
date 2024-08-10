"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { OrderColumn, columns } from "./Columns";
import { DataTable } from "@/components/DataTable";
import ApiList from "@/components/ApiList";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient = ({ data }: OrderClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage Orders in your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};
