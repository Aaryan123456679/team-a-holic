import Image from "next/image";

export const EmptySearch = () => {
    return ( <div className="h-full flex flex-col justify-center items-center">
        <Image 
        src = '/not_search.svg'
        alt = "NO SEARCHES FOUND"
        height={140}
        width={140}
        />
        <h2 className="font-semibold text-2xl mt-6">
            NO Results Found.
        </h2>
        <p className="text-muted-foreground text-sm mt-2">
            Try searching for something else.
        </p>
    </div> )
}