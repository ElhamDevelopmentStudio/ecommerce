"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./Columns";
import { DataTable } from "@/components/DataTable";
import ApiList from "@/components/ApiList";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient = ({ data }: ProductClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage Products"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
