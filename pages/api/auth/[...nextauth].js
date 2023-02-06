import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt, { sign } from "jsonwebtoken";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Facilitoy",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "teste@gmail.com",
        },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await axios.post(
          process.env.HASURA_URL,
          {
            query: `{
            user(where: {email: {_eq: "${credentials.email}"}}) {
              role
              email
              name
              password
              id
            }
          }`,
          },
          {
            headers: {
              "x-hasura-admin-secret": process.env.HASURA_ADMIN,
            },
          }
        );

        // If no error and we have user data, return it
        if (res.data.data.user.length == 0) {
          return null;
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          res.data.data.user[0].password
        );

        if (isValid) {
          return res.data.data.user[0];
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  debug: true,
  pages: {
    signIn: "/login",
    signUp: "/cadastrar",
  },
  jwt: {
    async encode({ secret, token, maxAge }) {
      const jwtClaims = {
        sub: String(token.sub),
        name: token.name,
        email: token.email,
        role: token.role,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": [token.role],
          "x-hasura-default-role": token.role,
          "x-hasura-role": token.role,
          "x-hasura-user-id": String(token.sub),
        },
      };
      const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
      return encodedToken;
    },
    async decode({ secret, token }) {
      const decodedToken = jwt.verify(token, secret, { algorithms: ["HS256"] });
      return decodedToken;
    },
  },
  callbacks: {
    async session({ session, token }) {
      const encodedToken = jwt.sign(token, process.env.SECRET, {
        algorithm: "HS256",
      });
      session.id = token.id;
      session.user.id = token.id;
      session.user.role = token.role;
      session.token = encodedToken;
      return Promise.resolve(session);
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      const isUserSignedIn = user ? true : false;
      // make a http call to our graphql api
      // store this in postgres

      if (isUserSignedIn) {
        token.sub = user.id;

        token.role = user.role;
      }
      return Promise.resolve(token);
    },
  },
};
export default NextAuth(authOptions);
