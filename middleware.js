import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secret-key"; 
export function middleware(req) {
  const token = req.cookies.get("token");

  console.log("Token:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    // Affiche l'erreur pour le débogage
    console.log("Token verification error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/protected/page.js"], }
