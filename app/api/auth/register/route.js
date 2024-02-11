import { NextResponse } from "next/server";

export async function POST(request){
    try{
        //get data from form and make sure it is fromatted properly
        //should be user state -> user:{name, location, email, password, etc...}
        const {username, password, firstname, lastname, location, job_titles, experience, skills, job_types } = await request.json()

        //Make API call with request body
        const registerEndpoint = 'https://jobbunny.co/jobbunnyapi/v1/register'
        const response = await fetch(registerEndpoint,{
            method:"POST",
            headers: {'Content-Type': 'application/json', },
            body: JSON.stringify({
                username, password, firstname, lastname, location, job_titles, experience, skills, job_types})
        })
        if (!response.ok) {
            //Handle response errors, e.g, invalid data, user already exists
            console.log("there was an error")
            const errorData = await response.json();
            console.error('Error from external API:', errorData);
            return NextResponse.json({ message: 'Registration failed', details: errorData })
        }
        //if the call is successfull 
        console.log('User register successfully')
        return NextResponse.json({messgae: 'success'})

    } catch (e) {
        return NextResponse.json({ message: 'An error occurred', error: e.message });
    }
}