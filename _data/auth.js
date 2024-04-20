import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [CredentialsProvider({
        credentials: {
            username: {},
            password: {},
        },
        async authorize(credentials, req) {
            try {
                const response = await fetch('https://jobbunnyapi.com/jobbunnyapi/v1/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: credentials.username,
                        password: credentials.password
                    })
                });

                const user = await response.json();
                console.log(user);

                if (user.status === 404) {
                    throw new Error(user.message)
                }

                if (!response.ok) {
                    console.error('Login request failed:', response.status, response.statusText);
                    return response;
                }

                if (user.jb_token) {
                    console.log(user)
                    return {
                        name: { first: user.firstname, last: user.lastname },
                        email: user.username,
                        image: '',
                        jb_token: user.jb_token
                    };
                } else {
                    return null;
                }
            } catch (e) {
                console.error('Error in authorize function:', e);
                return null;
            }
        }
    })],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.jb_token = token.jb_token;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.jb_token = user.jb_token;
            }
            return token;
        },
        async signOut(signOutOptions) {
            const { token } = signOutOptions

            const logoutResponse = await fetch('https://jobbunnyapi.com/jobbunnyapi/v1/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: token.email })
            })

            console.log(logoutResponse)
            return true
        }
    },
    secret: process.env.NEXTAUTH_SECRET,


}