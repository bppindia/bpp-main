import { ReactNode } from "react"

type FormWrapperProps = {
    title: string
    children: ReactNode
}

export function FormWrapper({ children }: FormWrapperProps) {
    return (
        <>
            <div
                className="max-w-xl p-3 space-y-3 w-xl">
                <div className="grid gap-4">
                    {children}
                </div>
            </div>
        </>
    )
}