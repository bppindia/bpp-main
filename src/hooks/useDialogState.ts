import { useState } from "react";

export default function useDialogState<T>(initialState: T | null) {
    const [state, setState] = useState<T | null>(initialState);

    const openDialog = (value: T) => setState(value);
    const closeDialog = () => setState(null);

    return [state, setState, openDialog, closeDialog] as const;
}
