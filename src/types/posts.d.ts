export type postFormValues = {
    title : string,
    contents: string
    country: string
    meetDate: string
    latitude: number
    longitude: number
    // location : locationFormValues | null
    
}

export type locationFormValues = {
    latitude: number,
    longitude: number
}

export type cardItem={
    id: number,
    category: number,
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

export type createChat = {
    receiver:string
    postId:number
}
