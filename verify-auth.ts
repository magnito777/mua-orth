import { createAuthClient } from "better-auth/client";

const client = createAuthClient({
    baseURL: "http://localhost:5620",
});

async function main() {
    const email = `testuser_${Date.now()}@example.com`;
    const password = "password123";
    const name = "Test User";

    console.log(`Signing up ${email}...`);
    const signUpRes = await client.signUp.email({
        email,
        password,
        name,
    });

    if (signUpRes.error) {
        console.error("Sign up failed:", signUpRes.error);
        process.exit(1);
    }
    console.log("Sign up successful!");

    console.log("Signing in...");
    const signInRes = await client.signIn.email({
        email,
        password,
    });

    if (signInRes.error) {
        console.error("Sign in failed:", signInRes.error);
        process.exit(1);
    }
    console.log("Sign in successful!");

    // Fetch dashboard (protected route) - client handles cookies? 
    // better-auth client is browser based usually, but in node we might need to handle headers manually if not polyfilled.
    // Actually, let's just use raw fetch for the protected route using the headers from the session if possible.
    // But wait, the client stores session in memory/cookies?
    // Let's rely on the `getSession` call which the client docs says it handles.
    // For this node script, let's just use fetch for the dashboard using 'cookie' header if we can get it.
    // But `signInRes` might not give back the cookie directly in the body? Standard better-auth sets Set-Cookie.

    console.log("Done.");
}

main();
