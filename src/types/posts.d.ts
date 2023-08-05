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

export type cardItem={
    id: number,
    nickname: string,
    title: string,
    country: string,
    contents: string,
    createdAt: string,
    meetDate: string,
}

export type cardData ={
    item: cardItem[]
}