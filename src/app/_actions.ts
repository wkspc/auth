"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createNewStudent } from "@/service/mainApi/user";
import { StudentCreateProps } from "@/models/user";
import { redirect } from "next/navigation";
import { studentType, supervisorType } from "@/schema/schema";
import { createNewSupervisor } from "@/service/mainApi/supervisor";

export async function createNewStudentAction(newStudent: studentType) {
  try {
    const res = await createNewStudent(newStudent);
    console.log(res.error);
    if (res.status === 200) {
      revalidateTag("students");
      return { message: res.message };
    }
    if (res.error) {
      return { error: res.error };
    }
  } catch (err) {
    console.log(err);
  }
}
export async function createNewSupervisorAction(newSupervisor: supervisorType) {
  try {
    const res = await createNewSupervisor(newSupervisor);
    console.log(res.error);
    if (res.status === 200) {
      revalidateTag("supervisor");
      return { message: res.message };
    }
    if (res.error) {
      return { error: res.error };
    }
  } catch (err) {
    console.log(err);
  }
}
