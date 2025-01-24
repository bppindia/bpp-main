import { Dialog, DialogContent } from "../ui/dialog";

interface PopupDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    url: string;
    body: React.ReactNode;
}

export const PopupDialog = ({isOpen, onOpenChange, body}: PopupDialogProps) => {
    return(
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="w-full max-w-4xl p-8 bg-white rounded-lg max-h-96 overflow-y-auto"
            >
                    {body}
            </DialogContent>
        </Dialog>
    )
}