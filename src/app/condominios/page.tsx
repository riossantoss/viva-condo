"use client";

import { useEffect, useState } from 'react'  //useState é uma função do React que permite a um componente ter estado interno. 
import { ICondominio } from '@/services/condominio.service';
import { FaSearch } from "react-icons/fa";
// import { ICondominio } from '@/services/condominio.local.service'; //LOCAL REQUEST

export default function ListaCondominios() {
  const [condominios, setCondominios]= useState<ICondominio[]>([])
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
   // Estado para capturar o termo digitado na busca
  const [searchQuery, setSearchQuery] = useState("");

   // Filtra os condomínios com base no termo de busca digitado
  const condominiosFiltrados = condominios.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      c.nome_condominio.toLowerCase().includes(query) ||
      c.cidade_condominio.toLowerCase().includes(query) ||
      c.uf_condominio.toLowerCase().includes(query) ||
      c.tipo_condominio.toLowerCase().includes(query) ||
      c.endereco_condominio.toLowerCase().includes(query)
    );
  });
  
  

  useEffect(() => { //hook que executa uma função quando o componente é montado.
    const buscarCondominios = async () => {
      try {
        const response = await fetch("/api/condominios", { cache: "no-store" });
        const {data, success, count, error} = await response.json();

        if (!success) throw new Error(error ?? "Erro ao buscar condomínios"); // quando acionado o catch é executado
        setCondominios(data);

      } catch (e: any) {
        setErro(e.message ?? "Erro inesperado");
      } finally {
        setLoading(false);
      }      
    };
    buscarCondominios()
  }, []);// [] = executa apenas uma vez, quando o componente é montado.
  // Caso haja alguma váriavel no array, o efeito será executado novamente sempre que essa variável mudar.

  return (
    <div className="p-6 max-w-full">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Condomínios</h1>
      </div>

      {/* Barra de busca e filtros */}
      <div className="mb-4 flex justify-between gap-4">
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-12">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Nome</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Endereço</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Cidade</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">UF</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Tipo</th>
              {/* tipo: Residencial e comercial*/}          
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
             {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-3 text-center text-gray-500">
                  Carregando condomínios...
                </td>
              </tr>
            ) : erro ? (
              <tr>
                <td colSpan={7} className="px-4 py-3 text-center text-red-600">
                  {erro}
                </td>
              </tr>
            ) :condominios.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700" colSpan={7}>
                  Nenhum condomínio encontrado.
                </td>
              </tr>
            ) : (
              condominiosFiltrados.map((condominio, index) => (
                <tr key={condominio.id_condominio} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{String(index + 1)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.nome_condominio}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.endereco_condominio}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.cidade_condominio}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.uf_condominio}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{condominio.tipo_condominio}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500"></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}