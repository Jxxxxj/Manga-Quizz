import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, password } = await req.json();

  if (!name || !password) {
    return new Response(
      JSON.stringify({ error: "Nom et mot de passe requis." }),
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'inscription." }),
      { status: 500 }
    );
  }
}
