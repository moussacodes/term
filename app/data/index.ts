export interface Block{
    command: string
    result: string
}

export type RootState = {
    block: Block[]
}