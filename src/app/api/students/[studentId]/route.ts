import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET(
  req: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const { studentId } = params;
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    return NextResponse.json({ status: 200, data: student });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400, message: error });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const { studentId } = params;
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return NextResponse.json({
        status: 400,
        message: "Não existe estudante",
      });
    }

    const updateStudent = await req.json();

    const hashedPassword = await bcrypt.hash(updateStudent.password, 12);

    const studentUpdate = await prisma.student.update({
      where: {
        id: student.id,
      },
      data: {
        name: updateStudent.name,
        plate: updateStudent.plate,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Estudante atualizado com sucesso!",
      data: studentUpdate,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400, message: error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const { studentId } = params;
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return NextResponse.json({
        status: 400,
        message: "Não existe estudante",
      });
    }

    const deleteStudent = await prisma.student.delete({
      where: {
        id: studentId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Estudante deletado com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400, message: error });
  }
}
