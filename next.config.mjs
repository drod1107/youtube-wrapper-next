// next.config.js

export async function redirects() {
    return [
        {
            source: "/sign-up",
            destination: "/sign-up/custom",
            permanent: true
        },
        {
            source: "/docs/:path",
            destination: "/docs/:path*",
            permanent: true
        }
    ];
}
  
