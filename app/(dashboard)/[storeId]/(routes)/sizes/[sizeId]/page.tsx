import prismadb from "@/lib/Prismadb";
import { BillboardForm } from "../../../../../../components/forms/BillboardForm";
import { SizeForm } from "@/components/forms/SizeForm";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initalData={size} />
      </div>
    </div>
  );
};

export default SizePage;