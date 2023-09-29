import {currentProfile} from "@/lib/currentProfile";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import {ChannelType} from "@prisma/client";
import ServerHeader from "@/components/server/serverHeader";
import ServerWrap from "@/components/server/serverWrap";
import ServerChannels from "@/components/server/serverChannels";
import {ScrollArea} from "@/components/ui/scroll-area";
import ServerMembers from "@/components/server/serverMembers";
import {Separator} from "@/components/ui/separator";

interface ServerSidebarProps {
    serverId: string;
}

const ServerSidebar = async ({serverId}: ServerSidebarProps) => {

    const profile = await currentProfile();

    if (!profile) {
        redirect("/")
    }
    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const voiceChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
    const members = server?.members.filter((member) => member.profileId !== profile.id);

    const role = server?.members.find((member) => member.profileId === profile.id)?.role


    if (!server) {
        return redirect("/")
    }

    return (
        <ScrollArea className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            <div>
                <ServerHeader server={server} role={role}/>
                <div>
                    {!!textChannels?.length && (
                        <div>
                            <ServerWrap section="channels" channelType={ChannelType.TEXT} role={role}
                                        label="Text Channel"/>
                        </div>
                    )}
                    {textChannels?.map((channel) => {
                        return (
                            <ServerChannels key={channel.id} server={server} role={role} channel={channel}/>
                        )
                    })}
                </div>
                <div>
                    {!!voiceChannels?.length && (
                        <div>
                            <ServerWrap section="channels" channelType={ChannelType.AUDIO} role={role}
                                        label="Voice Channel"/>
                        </div>
                    )}
                    {voiceChannels?.map((channel) => {
                        return (
                            <ServerChannels key={channel.id} server={server} role={role} channel={channel}/>
                        )
                    })}
                </div>
            </div>
            <div className="text-xs p-2 uppercase font-semibold text-zinc-500 dark:text-zinc-400">Members</div>
            <Separator/>
            <div className="space-y-[2px]">
                {server?.members.map((member) => (
                    <ServerMembers key={member.id} member={member} server={server}/>
                ))}
            </div>
        </ScrollArea>
    )
}
export default ServerSidebar