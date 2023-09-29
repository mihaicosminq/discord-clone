"use client"

import {ChannelType, MemberRole} from "@prisma/client";
import {ServerWithMembersWithProfiles} from "@/types";
import ActionTooltip from "@/components/actionTooltip";
import {Plus, Settings} from "lucide-react";
import useModal from "@/hooks/modalStore";
import {Separator} from "@/components/ui/separator";
import ChannelHeader from "@/app/(main)/(routes)/servers/[serverId]/channels/[channelId]/page";

interface ServerWrapProps {
    label: string,
    role?: MemberRole,
    section: "channels" | "members",
    channelType?: ChannelType,
    server?: ServerWithMembersWithProfiles
}

const ServerWrap = ({label, role, section, channelType, server}: ServerWrapProps) => {

    const {onOpen} = useModal();

    return (
        <>
        <div className="flex items-center justify-between p-3">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
            {role !== MemberRole.GUEST && section === "channels" && (
                <ActionTooltip label="Create Channel" side="top">
                    <button
                        onClick={() => onOpen("createChannel")}
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Plus className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN || role=== MemberRole.MODERATOR && section==="members" &&(
                <ActionTooltip label="Manage members" side="top">
                    <button
                        onClick={()=> onOpen("members",{server})}
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                    >
                        <Settings className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
        </div>
        <Separator/>
        </>
    )
}
export default ServerWrap