import { ReactNode } from "react"

type FormWrapperProps = {
    title: string
    children: ReactNode
}

export function FormWrapper({ children }: FormWrapperProps) {
    return (
        <>
            <div
                className="space-y-3 p-5 max-w-lg">
                <div className="grid gap-4">
                    {children}
                </div>
            </div>
        </>
    )
}