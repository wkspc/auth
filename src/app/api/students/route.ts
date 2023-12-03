import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const newStudent = await req.json();
  try {
    const existingUser = await prisma.student.findUnique({
      where: {
        email: newStudent.email,
      },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Estudante já cadastrado!" });
    }
    const hashedPassword = await bcrypt.hash(newStudent.password, 12);

    const student = await prisma.student.create({
      data: {
        email: newStudent.email,
        name: newStudent.name,
        plate: newStudent.plate,
        role: "STUDENT",
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Estudante cadastardo com sucesso!",
      data: student,
    });
  } catch (err) {
    console.log(err);
    return { status: 400 };
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json({ status: 200, data: students });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400 });
  }
}
