"use client"
import * as z from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import qs from "query-string"
import FileUpload from "@/components/fileUpload";
import {useRouter} from "next/navigation";
import useModal from "@/hooks/modalStore";
import {useEffect} from "react";
import {ChannelType} from "@prisma/client";
import axios from "axios";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name is required."
    }).refine(
        name => name !== "general",
        {
            message: "Channel name cannot be general"
        }
    ),
    type: z.nativeEnum(ChannelType)
})


const EditChannelModal = () => {

    const {isOpen, onClose, type, data} = useModal();

    const isModalOpen = isOpen && type === "editChannel";

    const {server, channel} = data;

    const router = useRouter();


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            type: channel?.type || ChannelType.TEXT
        }
    })

    useEffect(() => {
        if (channel && channel.type) {
            form.setValue("name", channel.name);
            form.setValue("type", channel.type);
        }
    }, [channel, form]);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            });
            await axios.patch(url, values);
            form.reset();
            router.refresh();
            onClose();
        } catch (e) {
            console.log(e)
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Edit channel</DialogTitle>
                    <DialogDescription className="text-center text-gray-600">
                        Edit your channel
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                                <FormField control={form.control}
                                           name="name"
                                           render={({field}) => (
                                               <FormItem>
                                                   <FormLabel>Channel Name</FormLabel>
                                                   <FormControl>
                                                       <Input
                                                           disabled={isLoading}
                                                           className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                           placeholder="Set a new channel name"
                                                           {...field}
                                                       />
                                                   </FormControl>
                                               </FormItem>
                                           )}/>
                            <FormField
                                control={form.control}
                                name="type"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Select channel type</FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                                    <SelectValue  placeholder="Select a channel type"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(ChannelType).map((type) =>(
                                                        <SelectItem value={type} key={type} className="capitalize">
                                                            {type.toLowerCase()}
                                                        </SelectItem>

                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} variant="primary">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default EditChannelModal