"use client";
import React, { useCallback, useState } from "react";
import { Input } from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { createNewStudentAction, createNewSupervisorAction } from "../_actions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  studentSchema,
  studentType,
  supervisorSchema,
  userType,
} from "@/schema/schema";
import { toast } from "sonner";
import { z } from "zod";

export default function AuthPage() {
  const { login, loading } = useAuth();
  const [variant, setVariant] = useState("register");
  const [type, setType] = useState("student");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const toggleType = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setType((currentType: string) =>
        currentType === "student" ? "supervisor" : "student"
      );
    },
    []
  );

  const schema =
    variant === "login"
      ? z.object({
          email: z.string().email("Email inválido!"),
          password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres!"),
        })
      : type === "student"
      ? studentSchema
      : supervisorSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<studentType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: userType) => {
    if (variant === "login") {
      await login(data.email, data.password);
    }
    if (variant === "register" && type === "student") {
      const res = await createNewStudentAction({
        name: data.name,
        email: data.email,
        password: data.password,
        plate: +data.plate!,
      });
      if (res?.message) return toast.success(res.message);
      if (res?.error) return toast.error(res.error);
    }
    if (variant === "register" && type === "supervisor") {
      const res = await createNewSupervisorAction({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (res?.message) return toast.success(res?.message);
      if (res?.error) return toast.error(res.error);
    }
    reset();
  };

  return (
    <section className="bg-[#76b852] flex flex-col justify-start items-center h-screen w-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-md text-sm w-[360px] h-auto mt-24 flex flex-col gap-4 justify-center items-center p-6"
        action=""
      >
        <h2 className="text-[#4caf50] text-4xl mb-2 text-start w-full font-semibold">
          {variant === "login" ? "Entrar" : "Cadastrar"}
        </h2>
        {variant === "register" && (
          <div className="w-full flex justify-between">
            <button
              onClick={(event) => toggleType(event)}
              className={`w-full text-base rounded-md ${
                type === "student"
                  ? "bg-[#4caf50] h-10 text-white"
                  : "bg-white text-gray-400"
              }`}
            >
              Aluno
            </button>
            <button
              onClick={(event) => toggleType(event)}
              className={`w-full text-base rounded-md ${
                type === "supervisor"
                  ? "bg-[#4caf50] h-10 text-white"
                  : "bg-white text-gray-400"
              }`}
            >
              Supervisor
            </button>
          </div>
        )}
        {variant === "register" && type === "student" && (
          <>
            <Input
              type="text"
              id="name"
              label="Nome"
              {...register("name", { required: true, minLength: 3 })}
              errors={errors.name}
            />
            <Input
              type="text"
              id="plate"
              label="Matricula"
              {...register("plate")}
              errors={errors.plate}
            />
          </>
        )}
        {variant === "register" && type === "supervisor" && (
          <>
            <Input
              type="text"
              id="name"
              label="Nome"
              {...register("name", { required: true, minLength: 3 })}
              errors={errors.name}
            />
          </>
        )}

        <Input
          type="text"
          id="email"
          label="E-mail"
          {...register("email", { required: true, minLength: 3 })}
          errors={errors.email}
        />
        <Input
          type="text"
          id="password"
          label="Senha"
          {...register("password", { required: true, minLength: 3 })}
          errors={errors.password}
        />

        <button
          type="submit"
          className="w-full text-base bg-[#4caf50] h-12 text-white rounded-md"
        >
          {variant === "login" ? "Entrar" : "Registrar"}
        </button>
        <small className="text-[#babace] flex justify-start w-full text-xs">
          {variant === "login" ? "Não registrado?" : "Já possui registro?"}
          <span
            onClick={toggleVariant}
            className="text-[#4caf50] hover:underline cursor-pointer pl-1"
          >
            {variant === "login" ? "Crie sua conta aqui" : "Entre aqui"}
          </span>
        </small>
      </form>
    </section>
  );
}
