export type ProvinceType  = {
    id?: string | number,
    code?: string | number,
    name?: string,
    isDeleted?: boolean
}

export type  ProvinceState =  {
    provinceList: ProvinceType[]
}