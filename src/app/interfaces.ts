

export interface CountryData {
    id: string,
    code: string,
    name: string,
    nameUn: string,
    continent: string,
    hasStates: boolean,
}

export type CountryTableProps = {
    countries: CountryData[]
}