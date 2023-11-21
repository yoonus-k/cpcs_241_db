import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email", placeholder: "email" },
      },

      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        // write code to retrieve user from database

        const email = credentials.email;
        const username = credentials.username;
        const result =
          await sql`select seller_id,seller_name,email,'seller' as source from seller where email = ${email} and seller_name = ${username}
          UNION ALL
          select buyer_id,buyer_name,email,'buyer' as source from buyer where email = ${email} and buyer_name = ${username}
          UNION ALL
          select agent_id,agent_name,email,'agent' as source from agent where email = ${email} and agent_name = ${username}
          ;`;

        console.log("from credentials provider authorize: ");
        console.log(result);

        if (result.rows.length > 0) {
          const sessionUser = {
            id: result.rows[0].seller_id,
            name: result.rows[0].seller_name,
            email: result.rows[0].email,
            source: result.rows[0].source,
          };
          return sessionUser;
        } else {
          throw new Error("user not found");
        }
        // Return null if user data could not be retrieved
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      console.log("from session call back: ");

      session.user = token;
      console.log(session);
      //const sesstionUser = await User.findOne({ email: session.user.email });

      //   if (!sesstionUser) {
      //     return session;
      //   }
      //   session.user.id = sesstionUser._id.toString();
      //   session.user.username = sesstionUser.username;
      //   session.user.image = sesstionUser.image;

      // console.log("session fired! " + sesstionUser._id.toString());

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        console.log("from sign in call back credentials: ");
        console.log(credentials);
        console.log("from sign in call back user: ");
        console.log(user);

        // for the credentials provider

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
