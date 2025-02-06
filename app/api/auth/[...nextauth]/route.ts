import  NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {prisma} from "@/prisma/prisma"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
              password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
              console.log('________ credentials', credentials);
              // Return null if user data could not be retrieved
      
              if ('1' === credentials?.username && '1' === credentials?.password)
                return { id: '11111', name: 'J Smith', email: 'jsmith@example.com' };
              return null;
            }
          }),
        //   GithubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        //   }),
    ],
})

export {handler as GET, handler as POST}