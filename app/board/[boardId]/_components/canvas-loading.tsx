import { Loader } from "lucide-react";
import { InfoSkeleton } from "./info";
import { ParticipantSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

export const Loading = () => {
    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
            <InfoSkeleton /> 
            <ParticipantSkeleton />
            <ToolbarSkeleton />
            <Loader className="w-6 h-6 text-muted-foreground animate-spin"/>
        </main>
    )
}