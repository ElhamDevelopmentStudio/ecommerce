"use client";
import * as z from "zod"

import axios from "axios"
import { useStoreModalStore } from "@/hooks/UseStoreModal";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1),
});



export const StoreModal = () => {
    const StoreModal = useStoreModalStore();

    const[loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",

        },
    })

    const onSubmit= async ( values: z.infer<typeof formSchema>) => {
        try{
            setLoading(true)

           const response = await axios.post('/api/stores', values);

           window.location.assign(`/${response.data.id}`)
        } catch (error){
            toast.error("something went wrong");
        } finally{
            setLoading(false);
        }
       //Todo :Create store 
    }

    return(
    <Modal
        title="Create Store"
        description="add new store to manage products and categories"
        isOpen={StoreModal.isOpen}
        onClose={StoreModal.onClose}
    ><div>
        <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (<FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input disabled={loading} 
                    placeholder= "Store Name" 
                    {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
            )}
            />
            <div className="pt-6 Space-x-2 flex items-center justify-end w-full">
                <Button
                disabled={loading} 
                variant="outline"
                 onClick={StoreModal.onClose}>
                    cancel
                </Button>
                <Button
                disabled={loading} 
                 type="submit">
                    Continue
                </Button>
            </div>
            </form>
        </Form>
        </div>
    </div>
    </Modal>
    );
};