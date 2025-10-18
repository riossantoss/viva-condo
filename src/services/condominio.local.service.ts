import { pool } from "@/utils/supabase/postgres.local";
import type { QueryResult } from "pg";

export interface ICondominio {
  id_condominio: number;
  id_administradora: number;
  nome: string;
  cnpj: string;
  tipo: string;
  telefone: string;
  nome_sindico: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  data_criacao: Date;
}

export async function getCondominios(){
  try {
    const result: QueryResult = await pool.query("SELECT * FROM public.condominio ORDER BY id_condominio");
    
    return result.rows ?? [];
    
  } catch (e: any) {
    throw new Error(e?.message ?? "Falha ao buscar condomínios");
  }
}