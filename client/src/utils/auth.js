export async function checkAuth() {
    try {
        const res = await fetch("/api/user/check-auth", {
            credentials: 'include',
        });
        return await res.json();
    } catch (error) {
        console.error("Auth check failed:", error);
        return { isLoggedIn: false, error };
    }
}