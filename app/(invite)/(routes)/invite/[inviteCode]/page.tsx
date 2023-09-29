import {currentProfile} from "@/lib/currentProfile";
import {redirectToSignIn} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";

interface InvitePageCodeProps {
    params:
        {
            inviteCode: string;
        }

}

const InvitePageCode = async ({params}: InvitePageCodeProps) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn()
    }

    if (!params.inviteCode) {
        return redirect("/")
    }

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (existingServer) {
        return redirect(`/servers/${existingServer.id}`)
    }

    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`)
    }
    return null
}
export default InvitePageCode