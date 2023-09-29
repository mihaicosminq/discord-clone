"use client"

import useModal from "@/hooks/modalStore";
import qs from "query-string"
import {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

function DeleteChannel() {


    const {isOpen, onClose, type, data} = useModal();

    const [isLoading, setIsLoading] = useState(false);

    const {server, channel} = data;


    const isModalOpen = isOpen && type === "deleteChannel";

    const router = useRouter();

    const onDelete = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            })

            await axios.delete(url)

            onClose();

            router.refresh();

            router.push(`/servers/${server?.id}`);

        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Delete {channel?.name} ?</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to delete <span
                        className="font-bold text-pink-950">{channel?.name} </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button disabled={isLoading} variant="primary" onClick={onDelete}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteChannel;