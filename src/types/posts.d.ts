export type postFormValues = {
    title : string,
    contents: string
    country: string
    location : locationFormValues
    }

export type locationFormValues = {
    latitude: number,
    longitude: number
}

