import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const googleId = process.env.AUTH_GOOGLE_ID as string;
const googleSecret = process.env.AUTH_GOOGLE_SECRET as string;

const githubId = process.env.AUTH_GITHUB_ID as string;
const githubSecret = process.env.AUTH_GITHUB_SECRET as string;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
  ],
  secret: process.env.AUTH_NEXT_JWT,
});
