export interface SMART_DIALOG_CALLBACK {
    (data: {
        button: number,
        listItem: number,
        inputText: string,
        repeatDialog(repeatInfo: string): void
    }): any
}

export interface SMART_DIALOG_SHOWING {
    [key: number]: boolean
}