"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useRenameModel } from "@/store/use-modal-rename";
import {  FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";

export const RenameModal = () => {

    const {mutate , pending} = useApiMutation(api.board.update);


    const {isOpen , onClose, initialValues} = useRenameModel();
    const [title,setTitle] = useState(initialValues.title);

    useEffect(()=>{
        setTitle(initialValues.title);
    }, [initialValues.title])

    const onSubmit : FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title,
        }).then(()=> {toast.success("Title Changed")
        onClose();
    })
        .catch(()=> {toast.error("Title Not Changed")});

    };
    
    return (
        <Dialog open = {isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Board Title</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter New Title for your board.
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input 
                    disabled = {pending}
                    required
                    maxLength={60}
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                    placeholder="Board Title"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}