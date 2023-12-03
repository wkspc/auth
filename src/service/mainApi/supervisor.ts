import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { supervisorType } from "@/schema/schema";

export async function createNewSupervisor(newSupervisor: supervisorType) {
  try {
    const existingSupervisor = await prisma.supervisor.findUnique({
      where: {
        email: newSupervisor.email,
      },
    });
    if (existingSupervisor) {
      return { error: "Supervisor já cadastrado!" };
    }
    const hashedPassword = await bcrypt.hash(newSupervisor.password, 12);

    const supervisor = await prisma.supervisor.create({
      data: {
        email: newSupervisor.email,
        name: newSupervisor.name,
        role: "SUPERVISOR",
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return {
      status: 200,
      message: "Supervisor cadastardo com sucesso!",
      data: supervisor,
    };
  } catch (err) {
    console.log(err);
    return { status: 400 };
  }
}
