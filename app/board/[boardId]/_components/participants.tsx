export const Participants = () => {
    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md px-3 flex items-center shadow-md">
            Participants
        </div>
    )
}

Participants.Skeleton = function ParticipantSkeleton () {
    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md px-3 flex items-center shadow-md w-[100px]" />
    )
}