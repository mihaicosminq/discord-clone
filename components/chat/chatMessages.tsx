"use client"


import {Member} from "@prisma/client";
import ChatWelcome from "@/components/chat/chatWelcome";


interface ChatMessagesProps{
    name:string,
    member:Member,
    chatId:string,
    apiUrl:string,
    socketUrl:string,
    socketQuery:Record<string, string>,
    paramKey:"channelId" | "conversationId",
    paramValue:string,
    type:"channel" | "conversation",
}


function ChatMessages({name,member,chatId,apiUrl,socketUrl,socketQuery,paramKey,paramValue,type}:ChatMessagesProps){


    return(
        <div className="flex-1 flex flex-col overflow-y-auto py-4">
            <div className="flex-1"/>
            <ChatWelcome type={type} name={name}/>
        </div>
    )
}
export default ChatMessages