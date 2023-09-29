"use client"

import ServerModal from "@/components/modals/serverModal"
import {useEffect, useState} from "react";
import InviteModal from "@/components/modals/inviteModal";
import EditServerModal from "@/components/modals/editServerModal";
import ManageMembers from "@/components/modals/manageMembers";
import ChannelModal from "@/components/modals/channelModal";
import LeaveServer from "@/components/modals/leaveServer";
import EditChannelModal from "@/components/modals/editChannel";
import DeleteServer from "@/components/modals/deleteServer";
import DeleteChannel from "@/components/modals/deleteChannel";
import MessageAttachment from "@/components/modals/messageAttachment";


const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null
    }

    return (
        <>
            <ServerModal/>
            <InviteModal/>
            <EditServerModal/>
            <ManageMembers/>
            <ChannelModal/>
            <LeaveServer/>
            <DeleteServer/>
            <EditChannelModal/>
            <DeleteChannel/>
            <MessageAttachment/>
        </>
    )
}
export default ModalProvider