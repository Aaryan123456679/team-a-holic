import { useSelf, useMutation } from "@/liveblocks.config";

export const useDeleteLayers = () => {
    const selection = useSelf((me) => me.presence.selection);
    return useMutation((
        {storage, setMyPresence},
    )=>{
        const liveLayerIds = storage.get("layerIds");
        const liveLayers = storage.get("layers");

        for (const id of selection){
            liveLayers.delete(id);
            const index = liveLayerIds.indexOf(id);

            if(index !== -1) {
                liveLayerIds.delete(index);
            }
        }

        setMyPresence({selection : []} , {addToHistory : true});
    },[selection])
}