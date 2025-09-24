import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(_req) {
    // Middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req: _req }) => {
        // Check if user is authenticated
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
  ],
};