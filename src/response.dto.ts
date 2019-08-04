export enum Status {
    success = 'success',
    errors = 'errors',
    warning = 'warning',
}

export interface ResponseDto<T> {

    status: Status;

    data?: T;

    error?: object|string;
}
