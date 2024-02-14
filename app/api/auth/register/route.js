import { NextResponse } from "next/server";

export async function POST(request) {
    try {

        //initialize response
        console.log("Initializing response...")
        const body = await request.json();
        const registerEndpoint = 'https://jobbunny.co/jobbunnyapi/v1/register';
        const response = await fetch(registerEndpoint, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        console.log("Request made...")

        const data = await response.json();
        console.log("data recieved from API: ", data)

        
        // First, check if the HTTP response is okay
        if (response.ok) {
            // Then, check the actual data for application-level success or failure
            if (data.status && data.status !== 200) {
                // Handle application-level errors
                console.error("Application-level error from external API:", data);
                return NextResponse.json({ message: 'Registration failed', details: data }, { status: data.status });
            } else {
                // Handle success
                console.log('User registered successfully:', data);
                return NextResponse.json({ message: 'success', user: data });
            }
        } else {
            // Handle HTTP-level errors
            console.error("HTTP-level error from external API:", data);
            return NextResponse.json({ message: 'Registration failed', details: data }, { status: response.status });
        }
    } catch (e) {
        console.error("An error occurred", e);
        return NextResponse.json({ message: 'An error occurred', error: e.message }, { status: 500 });
    }
}
