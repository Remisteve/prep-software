import { getAllDocuments } from "@/lib/firebaseRepository";
import { NextResponse } from "next/server";


export interface FilterOptions{
    field:string
    value: string | number | boolean
    operator?: string
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    try {

        const searchTerm = searchParams.get('search') || ''
        const pageSize = searchParams.get('limit') || '10'
        const startAfterDoc = searchParams.get('startAfterDoc') || null
        const page = searchParams.get('page') || '1'
        const gender = searchParams.get('gender')

        const filters: FilterOptions[]=[]

        if(gender){filters.push({field:'price', value:gender, operator:'=='})}

       
        const data = await getAllDocuments('users', startAfterDoc, page, pageSize, searchTerm)


        return NextResponse.json(data.data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}