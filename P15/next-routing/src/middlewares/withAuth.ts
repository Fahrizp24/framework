import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const hanyaAdmin = ["/admin"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token) {
        const loginUrl = new URL("/auth/login", req.url); // Redirect ke halaman login bawaan NextAuth
        loginUrl.searchParams.set("callbackUrl", encodeURI(req.url)); // untuk menyimpan url yang ingin diakses
        return NextResponse.redirect(loginUrl);
      }
      if (token.role !== "admin" && hanyaAdmin.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url)); // Redirect ke halaman utama jika role bukan admin
      }
    }
    return middleware(req, next);
  };
}