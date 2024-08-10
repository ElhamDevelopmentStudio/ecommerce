import prismadb from "@/lib/Prismadb";
import { BillboardForm } from "../../../../../../components/forms/BillboardForm";
import { SizeForm } from "@/components/forms/SizeForm";
import { ColorForm } from "@/components/forms/ColorForm";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initalData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
