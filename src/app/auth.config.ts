import type  NextAuthConfig  from "next-auth"
import type { JWT } from "next-auth/jwt"

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }: { auth: { user: JWT } | null, request: { nextUrl: URL } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    },
  },
  providers: [], // configured in route.ts
} 
// satisfies NextAuthConfig


//====
// export const authConfig: NextAuthConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }: { auth: { user: JWT } | null, request: { nextUrl: URL } }) {
//       const isLoggedIn = !!auth?.user
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
//       if (isOnDashboard) {
//         if (isLoggedIn) return true
//         return false // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl))
//       }
//       return true
//     },
//   },
//   providers: [], // configured in route.ts
// }


