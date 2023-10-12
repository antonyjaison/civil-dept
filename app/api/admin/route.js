import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { username, password} = await request.json()

    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        return NextResponse.json({
            status:true,
            username:username
        },{
            status:200
        })
    }else{
        return NextResponse.json({
            status:false,
            username:null
        },{
            status:401
        })
    }
}