import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const newSupervisor = await req.json();
  try {
    const existingUser = await prisma.supervisor.findUnique({
      where: {
        email: newSupervisor.email,
      },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Estudante já cadastrado!" });
    }
    const hashedPassword = await bcrypt.hash(newSupervisor.password, 12);

    const supervisor = await prisma.supervisor.create({
      data: {
        email: newSupervisor.email,
        name: newSupervisor.name,
        plate: null,
        role: "SUPERVISOR",
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Supervisor cadastardo com sucesso!",
      data: supervisor,
    });
  } catch (err) {
    console.log(err);
    return { status: 400 };
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const supervisor = await prisma.supervisor.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json({ status: 200, data: supervisor });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400 });
  }
}
