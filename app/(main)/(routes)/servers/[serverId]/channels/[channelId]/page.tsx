import {currentProfile} from "@/lib/currentProfile";
import {redirectToSignIn} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import {ChatHeader} from "@/components/chat/chatHeader";
import ChatInput from "@/components/chat/chatInput";
import ChatMessages from "@/components/chat/chatMessages"


interface ChannelHeaderProps {
    params: {
        serverId: string,
        channelId: string,
    }
}

async function ChannelHeader({params}: ChannelHeaderProps) {

    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    })

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        }
    })

    if (!channel || !member) {
        redirect("/")
    }

    return (
        <>

            <div className="block bg-white dark:bg-[#313338]  flex-col h-full">
                <ChatHeader serverId={channel?.serverId} name={channel?.name} type="channel"/>
            </div>
            <ChatMessages member={member}
                          name={channel.name}
                          chatId={channel.id}
                          type="channel"
                          apiUrl="/api/messages"
                          socketUrl="/api/socket/messages"
                          socketQuery={{
                              channelId: channel.id,
                              serverId: channel.serverId
                          }}
                          paramKey="channelId"
                          paramValue={channel.id}

            />
            <ChatInput name={channel.name} type="channel" apiUrl="/api/socket/messages" query={{
                channelId: channel.id,
                serverId: channel.serverId
            }}/>
        </>)
}

export default ChannelHeader