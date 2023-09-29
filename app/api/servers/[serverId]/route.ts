import {NextResponse} from "next/server";
import {currentProfile} from "@/lib/currentProfile";
import {db} from "@/lib/db";

export async function PATCH(req: Request, {params}: { params: { serverId: string } }) {
    try {

        const profile = await currentProfile();
        const {name, imageUrl} = await req.json()
        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401})
        }
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id,
            },
            data: {
                name: name,
                imageUrl: imageUrl
            }
        })
        return NextResponse.json(server)
    } catch (e) {
        console.log(e)
        return new NextResponse("Patch error", {status: 500})
    }
}

export async function DELETE(req: Request, {params}: { params: { serverId: string } }) {
    try {

        const profile = await currentProfile();


        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id,
            }
        })
        return NextResponse.json(server)
    } catch (e) {
        console.log(e)
        return new NextResponse("Patch error", {status: 500})
    }
}
