export type DistrictType  = {
    id?: string | number,
    code?: string | number,
    name?: string,
    isDeleted?: boolean
}

export type  DistrictState =  {
    districtList: DistrictType[]
}