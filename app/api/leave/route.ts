import {NextResponse} from "next/server";
import {currentProfile} from "@/lib/currentProfile";
import {db} from "@/lib/db";

export async function PATCH(req: Request, {params}: { params: { serverId: string } }) {
    try {

        const profile = await currentProfile();

        const {searchParams} = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!serverId) {
            return new NextResponse("serverId missing", {status: 400})
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id,

                    }
                },
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        })
        return NextResponse.json(server)

    } catch (e) {
        console.log(e)
        return new NextResponse("Internal error", {status: 500})
    }
}