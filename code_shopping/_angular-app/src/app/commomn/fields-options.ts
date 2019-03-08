export interface FieldsOptions{
    [Field: string]: {
        id: string,
        label: string,
        validationMessage?: {
            [error: string]: any
        }
    }
}