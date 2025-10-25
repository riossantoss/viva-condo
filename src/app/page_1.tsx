"use client";

type Morador = {
  primeiroNome: string;
  sobrenome: string;
};

export default function Home() {
  function formatarNomeMorador(morador: Morador){
    return morador.primeiroNome + " " + morador.sobrenome;
  }

  function obterSaudacao(morador:null | Morador) {
    if (morador) {
      return <span>Olá, {formatarNomeMorador(morador)}!</span>;
    }
    return <span>Olá, Desconhecido!!!</span>;
  }

  const morador = {
    primeiroNome: "João",
    sobrenome: "Pereira",
  };

  return (
    <div id="principal" className="min-h-screen flex items-center justify-center bg-black">
      <div id="componente-azul" className="card-azul"> {/* card-azul*/}
        <h1 id="name" className="text-2xl font-bold text-center">
          {obterSaudacao(morador)}
        </h1>
      </div>
    </div>
  );
}