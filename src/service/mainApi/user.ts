import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { studentType } from "@/schema/schema";

export async function createNewStudent(newStudent: studentType) {
  try {
    const existingUser = await prisma.student.findUnique({
      where: {
        email: newStudent.email,
      },
    });
    if (existingUser) {
      return { error: "Estudante já cadastrado!" };
    }
    const hashedPassword = await bcrypt.hash(newStudent.password, 12);

    const user = await prisma.student.create({
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

    return {
      status: 200,
      message: "Estudante cadastardo com sucesso!",
      data: user,
    };
  } catch (err) {
    console.log(err);
    return { status: 400 };
  }
}
