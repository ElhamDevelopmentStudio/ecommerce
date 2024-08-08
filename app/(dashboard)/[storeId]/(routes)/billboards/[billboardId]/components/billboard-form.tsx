"use client";

import * as z from "zod"
import { Billboard } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import { useState } from "react";
import { 
    Form,
     FormControl,
     FormField, 
     FormItem, 
     FormLabel, 
     FormMessage
    } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { APIAlert } from "@/components/ui/Api-Alert";
import { useOrigin } from "@/hooks/Use-orgin";
import { Abel } from "next/font/google";
import ImageUpload from "@/components/ui/image-upload"


interface BillboardFormProps{
    initalData:Billboard | null;
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl:z.string().min(1)
});
type BillboardFormValues= z.infer<typeof formSchema>;




export const BillboardForm: React.FC<BillboardFormProps> = ({
    initalData
})=>{
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);


    const title = initalData ? "edit billboard" : "Create billboard";
    const description = initalData ? "edit billboard" : "add a new billboard";
    const toastMessage = initalData ? " Billboard Updated" : "Create billboard";
    const action = initalData ? "Save changes" : "Create ";


    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initalData || {
            label: '',
            imageUrl:''
        }
        
    });

    const onSubmit = async(data:BillboardFormValues)=>{
       try{
        setLoading(true)
        if(initalData) {
            await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`,data);
        }	else {
            await axios.post(`/api/${params.storeId}/billboards`,data);
        }
        router.refresh();
        toast.success(toastMessage);
       }catch (error){
        toast.error("Something Went Wrong ");
       }
       finally {
        setLoading(false);
       }
    };
     const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            router.push("/");
            toast.success("Billboard Gone My Guy");
        } catch (error) {
            toast.error("make sure you removed all categories using this billboard first.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
            isOpen={open}
            onClose={()=> setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
        />
        <div className="flex items-center justify-between">
            <Heading
            title={title}
            description={description}
          />
          {initalData &&(
            <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={()=>setOpen(true)}
            >
                <Trash className="h-4 w-4"/>
            </Button>
        )}
        </div>
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) =>(
                        <FormItem>
                            <FormLabel>BackgroundImage</FormLabel>
                            <FormControl>
                              <ImageUpload 
                                value= {field.value ?[field.value]: []}
                                disabled={loading}
                                onChange={(url)=> field.onChange(url)}
                                onRemove={()=> field.onChange("")}
                              />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) =>(
                            <FormItem>
                                <FormLabel>label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="billboard label"{...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }
                    />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                    {action}
                </Button>
            </form>

        </Form>
        <Separator />
        </>
    );
}