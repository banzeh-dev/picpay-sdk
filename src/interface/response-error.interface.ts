export interface ErrorsItemsInterface {
    field: string;
    message: string;
}

export interface ResponseErrorInterface {
    message: string;
    errors?: Array<ErrorsItemsInterface>;
}
