import {Liveblocks} from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
    secret : "sk_dev_yJAjXCHLC9P3OleLYtoeNuNyHckGTq77DS41jaE0HV42p3b4BWxVaQhkSrWoCmnw"
})

export async function POST (request : Request) {
    const authorization  = await auth();
    const user = await currentUser();

    if(!authorization || !user){
        return new Response("Unauthorized")
    }
}