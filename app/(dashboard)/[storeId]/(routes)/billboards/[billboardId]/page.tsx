import prismadb from "@/lib/Prismadb";
import { BillboardForm } from "../../../../../../components/forms/BillboardForm";

const BillboardPage = async ({
    params
}:{
    params:{billboardId: string}
}) =>{
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    });

    return ( 
        
           <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initalData = {billboard}/>
            </div>
           </div>
     );
}
 
export default BillboardPage;