// // next-auth.d.ts
// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface User {
//     id: string;
//     name: string;
//     email: string;
//     image?: string;
//     role: string; // Ensure role is included here
//     password: string; // Include password in User type
//     createdAt: Date;
//     updatedAt: Date;
//   }

//   interface Session {
//     user: {
//       user: User; // Ensure the session user type includes all necessary fields
//     };
//   }

//   interface JWT {
//     id: string;
//     role: string; // Include role in the JWT token
//   }
// }
