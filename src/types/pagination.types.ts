export interface Pagination<D = any> {
    data: D
    metadata: Metadata
}
export type Metadata = {
    total: number,
    paginationLimit: number,
    count: number,
    page: number
}