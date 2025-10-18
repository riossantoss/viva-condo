// src/utils/postgres.ts
import { Pool } from "pg";

declare global { 
    // Problema: A cada reload no ambiente de Dev, será criada uma nova conexão/pool com o PostgreSQL.
    // Solução: O objetivo guardar a instância numa variável global (global.pgPool) e reaproveitá-la nos reloads:
  var pgPool: Pool | undefined; //tipagem
}

function createPool() { // cria conexão
    return new Pool({
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT),
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        // connectionString: process.env.DATABASE_URL, // alternativa
        // ssl: { rejectUnauthorized: false }, // se precisar SSL
  });
}

export const pool: Pool = global.pgPool ?? createPool();

if (process.env.NODE_ENV !== "production"){
  global.pgPool = pool;
}

//Dev: O Next.js, quando estamos em ambiente de Dev, recarrega o código várias vezes automaticamente (HMR).
//Se toda vez que ele recarregar a gente criar um novo pool de conexões, teremos várias conexões abertas para o banco de dados, gastando recursos à toa
// Prod: cada processo sobe uma vez só, então o global não é necessário.