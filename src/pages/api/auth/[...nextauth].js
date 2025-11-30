import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock User Database (In-memory)
// We attach it to the global object to persist across hot reloads in dev
if (!global.users) {
    global.users = [
        { id: "1", name: "Demo User", email: "demo@example.com", password: "password123" }
    ];
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = global.users.find(u => u.email === credentials.email);

                if (user && user.password === credentials.password) {
                    // Any object returned will be saved in `user` property of the JWT
                    return { id: user.id, name: user.name, email: user.email };
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET || "super-secret-key-change-me",
});
