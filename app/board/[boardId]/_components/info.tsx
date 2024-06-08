export const Info = () => {
    return (
        <div className="absolute left-2 top-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            
            TODO: Info about the board
        </div>
    )
}

Info.Skeleton = function InfoSkeleton() {
    return (
        <div className="absolute left-2 top-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
    )
}