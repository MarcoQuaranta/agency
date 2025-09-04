import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Simulazione di database utenti (sostituire con database reale)
const users = [
  {
    id: '1',
    email: 'test@example.com',
    password: '$2a$10$9vKZKK5xZ8.7xF2J8K2J8K2J8K2J8K2J8K2J8K2J8K2J8K2J8K2J8K2J8', // password: "password123"
    name: 'Test User',
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find((user) => user.email === credentials.email);

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
};

// Funzione per registrare nuovo utente
export async function registerUser(email: string, password: string, name: string) {
  const existingUser = users.find((user) => user.email === email);
  
  if (existingUser) {
    throw new Error('Utente già esistente');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    name,
  };

  users.push(newUser);
  
  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
  };
}