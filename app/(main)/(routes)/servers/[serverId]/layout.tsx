import React from "react";
import {currentProfile} from "@/lib/currentProfile";
import {redirect} from "next/navigation";
import {redirectToSignIn} from "@clerk/nextjs";
import {db} from "@/lib/db";
import ServerSidebar from "@/components/server/serverSidebar";


const ServerLayout = async ({children, params}: { children: React.ReactNode, params: { serverId: string , channelId:string } }) => {

    const profile = await currentProfile();

    if (!profile) {
        redirectToSignIn();
    }


    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile?.id
                }
            }
        }
    });

    if (!server) {
        return redirect("/")
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId}/>
            </div>
            <main className="h-full md:pl-60">{children}</main>

        </div>
    )
}
export default ServerLayout