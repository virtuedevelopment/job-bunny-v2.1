import { getSession, updateSession } from "next-auth/react";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    if (req.method === 'POST') {
        const session = await getSession({ req });
        if (session) {
            // Update session data here based on the latest user info from your DB
            const updatedSession = await updateSession(session);
            res.send({ ok: true, updatedSession });
        } else {
            res.send({ error: 'Session not found' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}