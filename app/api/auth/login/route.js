import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "your-secret-key"; // Changez cette clé en production

export async function POST(req) {
  const { name, password } = await req.json();

  if (!name || !password) {
    return new Response(
      JSON.stringify({ error: "Nom et mot de passe requis." }),
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({ where: { name } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(
        JSON.stringify({ error: "Nom ou mot de passe incorrect." }),
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la connexion." }),
      { status: 500 }
    );
  }
}
