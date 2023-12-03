import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET(
  req: NextRequest,
  { params }: { params: { supervisorId: string } }
) {
  try {
    const { supervisorId } = params;
    const supervisor = await prisma.supervisor.findUnique({
      where: {
        id: supervisorId,
      },
    });

    return NextResponse.json({ status: 200, data: supervisor });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400, message: error });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { supervisorId: string } }
) {
  try {
    const { supervisorId } = params;
    const supervisor = await prisma.supervisor.findUnique({
      where: {
        id: supervisorId,
      },
    });

    if (!supervisor) {
      return NextResponse.json({
        status: 400,
        message: "Não existe estudante",
      });
    }

    const updateSupervisor = await req.json();

    const hashedPassword = await bcrypt.hash(updateSupervisor.password, 12);

    const supervisorUpdate = await prisma.supervisor.update({
      where: {
        id: supervisor.id,
      },
      data: {
        name: updateSupervisor.name,
        plate: updateSupervisor.plate,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Supervisor atualizado com sucesso!",
      data: supervisorUpdate,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400, message: error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { supervisorId: string } }
) {
  try {
    const { supervisorId } = params;
    const supervisor = await prisma.supervisor.findUnique({
      where: {
        id: supervisorId,
      },
    });

    if (!supervisor) {
      return NextResponse.json({
        status: 400,
        message: "Não existe supervisor",
      });
    }

    const deletesupervisor = await prisma.supervisor.delete({
      where: {
        id: supervisorId,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Supervisor deletado com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 400, message: error });
  }
}
