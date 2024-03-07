import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        console.log("Initializing response...");
        const body = await request.json();
        const registerEndpoint = 'https://jobbunnyapi.com/jobbunnyapi/v1/register';
        const response = await fetch(registerEndpoint, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        console.log("Request made...");
        return response;
    } catch (e) {
        console.error("An error occurred", e);
        return NextResponse.json({ message: 'An error occurred', error: e.message }, { status: 500 });
    }
}
