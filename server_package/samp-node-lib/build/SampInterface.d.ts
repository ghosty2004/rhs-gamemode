export interface SMART_DIALOG_CALLBACK {
    (data: {
        button: number;
        listItem: number;
        inputText: string;
        repeatDialog(): void;
    }): any;
}
