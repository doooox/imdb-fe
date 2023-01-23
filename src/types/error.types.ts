interface Error {
    msg: string;
    param: string;
    loaction: string;
}
interface Data {
    errors: Error[]
}
export interface IError extends Data {

}