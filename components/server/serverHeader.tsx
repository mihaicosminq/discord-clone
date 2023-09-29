"use client"

import {ServerWithMembersWithProfiles} from "@/types";
import {MemberRole} from "@prisma/client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ChevronDown, LogOut, PlusCircle, Settings, TrashIcon, UserPlus, Users} from "lucide-react";
import useModal from "@/hooks/modalStore";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole
}

const ServerHeader = ({server, role}: ServerHeaderProps) => {

    const {onOpen} = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button
                    className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-500 dark:border-neutral-800 border-b-2 hover:bg-purple-950 dark:hover:bg-pink-800">{server.name}
                    <ChevronDown className="h-5 w-5 ml-auto"/></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-200 space-y-2">
                {isModerator &&
                    <DropdownMenuItem
                        onClick={() => onOpen("invite", {server})}
                        className="text-pink-500 dark:text-purple-500 px-3 py-2 text-sm cursor:pointer">
                        Invite people <UserPlus className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                }
                {isAdmin &&
                    <DropdownMenuItem
                        onClick={() => onOpen("editServer", {server})}
                        className="px-3 py-2 text-sm cursor:pointer">
                        Server Settings <Settings className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                }
                {isAdmin &&
                    <DropdownMenuItem
                        onClick={() => onOpen("members", {server})}
                        className="px-3 py-2 text-sm cursor:pointer">
                        Manage Members <Users className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                }
                {isModerator &&
                    <DropdownMenuItem
                        onClick={() => onOpen("createChannel")}
                        className="px-3 py-2 text-sm cursor:pointer">
                        Create Channel <PlusCircle className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                }
                {isModerator && <DropdownMenuSeparator/>}
                {isAdmin &&
                    <DropdownMenuItem
                        onClick={()=> onOpen("deleteServer",{server})}
                        className="text-rose-800 px-3 py-2 text-sm cursor:pointer">
                        Delete Server <TrashIcon className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                }
                {!isAdmin &&
                    <DropdownMenuItem
                        onClick={() => onOpen("leaveServer", {server})}
                        className="px-3 py-2 text-sm cursor:pointer">
                        Leave Server <LogOut className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                }
            </DropdownMenuContent>

        </DropdownMenu>
    )
}
export default ServerHeader