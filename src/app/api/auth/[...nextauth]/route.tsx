import { getUser } from "@/db/fetch";
import { Account, AuthOptions, Profile, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { Prosto_One } from "next/font/google";
import jwt from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
export const authOptions : AuthOptions = {
    providers: [
        Credentials({
            credentials:{
                email: {label: "email", type: "text", required: true},
                password: {label: "Password", type: "password", required: true}
            },
            async authorize(credentials){
                if (!credentials?.email || !credentials?.password) {return null;}
                const {email,password} = credentials;
                const currentUser  = await getUser(email)
                if(!currentUser){
                    return null; 
                } 
                const userPassword = currentUser.passwordHash;
                const isValidPassword =bcrypt.compareSync(password,userPassword)
                if (!isValidPassword) {
                    return  null;
                }
                return{
                    id: `${currentUser.id}`,
                    email: currentUser.email,
                };
            }
        })
    ],
    pages:{
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt:{
        async encode({secret,token}){
            if(!token){
                throw  new Error('No token to encode')
            }
            return jwt.sign(token,secret);

        },
        async decode({secret,token}){
            if(!token){
                throw  new Error('No token to encode')
            }
            const decodeToken = jwt.verify(token,secret)
           if (typeof decodeToken === 'string'){
            return JSON.parse(decodeToken)
           }else{
            return decodeToken
           }

        }
    },
    session:{
        strategy: 'jwt',
        maxAge: 30*24*60*60,
        updateAge: 24*60*60,
    },
    callbacks:{
        async session(params:{session:Session, token:JWT, user:  User}){
            if(params.session.user){
                params.session.user.email = params.token.email;
            }
            return  params.session;
        },
        async jwt(params:{
            token: JWT;
            user?: User| undefined;
            account?: Account | null | undefined;
            profile?: Profile | undefined;
            isNewUser?: boolean | undefined;
        }){
            if(params.user){
                params.token.email = params.user.email
            }
            return  params.token
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET,handler as POST}