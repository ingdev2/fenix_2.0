import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: any) {
  try {
    if (!token || !token.refresh_token) {
      throw new Error("Token de refresco no válido.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BONNA_HUB_BACKEND_URL}/auth/refreshToken`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.refresh_token}`,
        },
      }
    );

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw new Error("No se pudo refrescar el token.");
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      refresh_token: refreshedTokens.refresh_token,
      access_token_expires_in:
        Date.now() + refreshedTokens.access_token_expires_in * 1000,
    };
  } catch (error) {
    throw new Error("Error al refrescar el token de acceso");
  }
}

const handler = NextAuth({
  providers: [],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user && token) {
        return {
          ...token,
          ...user,
        };
      }

      if (
        token?.access_token_expires_in &&
        typeof token.access_token_expires_in === "number"
      ) {
        if (Date.now() < token.access_token_expires_in) {
          return token;
        } else {
          const refreshedToken = await refreshAccessToken(token);

          if (!refreshedToken.error) {
            return {
              ...token,
              access_token: refreshedToken.access_token,
              access_token_expires_in: refreshedToken.access_token_expires_in,
            };
          } else {
            return {};
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token;
      } else {
        session.user;
      }

      return session;
    },
  },
  pages: {
    signIn: `${process.env.NEXT_PUBLIC_BONNA_HUB_URL}/login`,
  },
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.NEXT_PUBLIC_MAX_AGE_SESSION) * 60,
  },
});

export { handler as GET, handler as POST };
