
import prisma from "@repo/db/client";

export async function resetDb(){
    await prisma.$transaction([
        prisma.website_tick.deleteMany(),
        prisma.website.deleteMany(),
        prisma.user.deleteMany(),
        prisma.region.deleteMany(),
    ]);
}