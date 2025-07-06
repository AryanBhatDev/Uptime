
import prisma from "@repo/db/client";

export async function resetDb(){
    await prisma.$transaction([
        prisma.user.deleteMany(),
        prisma.website.deleteMany(),
        prisma.website_tick.deleteMany(),
        prisma.region.deleteMany(),
    ])
}