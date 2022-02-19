export interface SMART_DIALOG_CALLBACK {
    (data: {
        button: number,
        listItem: number,
        inputText: number,
        repeatDialog(): void
    }): any
}