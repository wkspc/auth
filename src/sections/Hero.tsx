import React from "react";

const Hero = () => {
  return (
    <section className="w-full h-full bg-black text-white ">
      <div className=" flex flex-col justify-center items-center bg-red-600">
        <h1 className="text-4xl font-normal w-full flex justify-center">
          Olá,
          <br />
          Somos o Estagie IFCE
        </h1>
        <p className="text-6xl mt-4 flex flex-col md:flex-row">
          Em busca de um <span>Estágio?</span>
        </p>
      </div>
    </section>
  );
};

export default Hero;
