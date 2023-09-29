import qs from "query-string"
import {useParams} from "next/navigation"
import {useSocket} from "@/components/providers/socketProvider";


interface ChatQueryProps {
    queryKey: string,
    apiUrl: string,
    paramKey: "channelId" | "conversationId",
    paramValue: string
}

export const useChatQuery = ({query, apiUrl, paramValue, paramKey}: ChatQueryProps) => {
    const {isConnected} = useSocket();
    const params = useParams();
    const fetchMessages = async ({pageParam = undefined}) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue
            }
        }, {skipNull: true})
        const res = await fetch(url)
        return res.json()
    }

    const data =
}