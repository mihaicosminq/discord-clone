import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import useModal from "@/hooks/modalStore";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import FileUpload from "@/components/fileUpload";
import qs from "query-string"


const formSchema = z.object({
    messageFile: z.string().min(1, {
        message: "Attachment is required"
    })
})


const MessageAttachment = () => {

    const {isOpen, onOpen, onClose, type, data} = useModal();

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const {server, apiUrl, query} = data

    const isModalOpen = isOpen && type === "messageAttachment";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            messageFile: ""
        }
    })

    const handleClose = () => {
        form.reset();
        onClose();
    }


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            })
            await axios.post(url, {...values,content:values.messageFile})
            form.reset();
            router.refresh();
            handleClose();
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Create your server</DialogTitle>
                    <DialogDescription className="text-center text-gray-600">
                        Make your server and start talking with your friends
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField control={form.control}
                                           name="messageFile"
                                           render={({field}) => (
                                               <FormItem>
                                                   <FormControl>
                                                       <FileUpload endpoint="serverImage"
                                                                   value={field.value}
                                                                   onChange={field.onChange}/>
                                                   </FormControl>
                                               </FormItem>
                                           )}/>
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} variant="primary">Send</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default MessageAttachment