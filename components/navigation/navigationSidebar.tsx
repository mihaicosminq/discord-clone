import {currentProfile} from "@/lib/currentProfile";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import NavigationAction from "@/components/navigation/navigationAction";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import NavigationItem from "@/components/navigation/navigationItem";
import {ModeToggle} from "@/components/darkmodeToggle";
import {UserButton} from "@clerk/nextjs";


const NavigationSidebar = async () => {
    const profile = await currentProfile()

    if (!profile) {
        return redirect("/")
    }

    const findServers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })


    return (
        <div
            className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
            <NavigationAction/>
            <Separator className="h-[2px] bg-purple-950 dark:bg-purple-950 rounded-md w-10 mx-auto"/>
            <ScrollArea className="flex-1 w-full">
                {findServers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem name={server.name} image={server.imageUrl} id={server.id}/>
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle/>
                <UserButton afterSignOutUrl="/" appearance={{
                    elements: {
                        avatarBox: "h-[48px] w-[48px]"
                    }
                }}/>
            </div>
        </div>
    )
}
export default NavigationSidebar