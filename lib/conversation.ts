import {db} from "@/lib/db";


export const getOrCreateConvo= async (memberOneId: string, memberTwoId: string)=>{

    const conversation = await findConversation(memberOneId,memberTwoId) || await findConversation(memberTwoId,memberOneId);

    if(!conversation){
        const conversation = await createConversation(memberOneId,memberTwoId)
    }

    return conversation

}

async function findConversation(memberOneId: string, memberTwoId: string) {

    try {
        return db.conversation.findFirst({
            where: {
                AND: [{memberOneId: memberOneId}, {memberTwoId: memberTwoId}]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        });
    } catch {
        return null
    }
}

async function createConversation(memberOneId: string, memberTwoId: string) {
    try {
        return db.conversation.create({
            data: {
                memberOneId,
                memberTwoId
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }

        })
    } catch {
        return null
    }
}