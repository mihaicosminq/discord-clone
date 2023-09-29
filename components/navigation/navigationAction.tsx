"use client"
import {Plus} from "lucide-react";
import ActionTooltip from "@/components/actionTooltip";
import useModal from "@/hooks/modalStore";


const NavigationAction = () => {

    const {onOpen} = useModal()

    return (
        <div>
            <ActionTooltip side="right"
                           align="center"
                           label="Add a server">
                <button onClick={() => onOpen("createServer")}
                        className="group flex items-center">
                    <div
                        className="flex mx-3  h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px]
                         transition-all overflow-hidden items-center justify-center bg-background dark:bg-black
                         group-hover:bg-pink-500">
                        <Plus className="group-hover:text-white transition text-purple-500" size={25}/>
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}
export default NavigationAction