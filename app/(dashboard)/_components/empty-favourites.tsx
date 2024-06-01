import Image from "next/image";

export const EmptyFavorites = () => {
    return ( <div className="h-full flex flex-col justify-center items-center">
        <Image 
        src = '/no_favorites.svg'
        alt = "NO Favorites FOUND"
        height={140}
        width={140}
        />
        <h2 className="font-semibold text-2xl mt-6">
            NO Favorites Found.
        </h2>
        <p className="text-muted-foreground text-sm mt-2">
            Try favorating for board.
        </p>
    </div> )
}