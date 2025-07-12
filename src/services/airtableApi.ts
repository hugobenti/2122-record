// src/services/airtableApi.ts

/**
 * Define a estrutura de um registro genérico do Airtable
 * de acordo com o payload real que você forneceu.
 */
export interface AirtableRecord {
    id: string;
    fields: {
      titulo_pagina?: string;
      titulo?: string;
      artistas?: string;
      descricao?: string;
      link?: string;
      // Campos do catálogo
      Nome?: string;
      descricao_catalogo?: string;
      Videos?: string[];
      Playlist_link?: string;
      // se tiver mais campos, inclua aqui
    };
  }
  
  // Base e Token do Airtable.
  // Você pode colocar o Base ID fixo ou ler de .env
  // Ex.: const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID || "";
  const BASE_ID = "appDoTTDEDNlEvZBh"; 
  const AIRTABLE_TOKEN = process.env.REACT_APP_AIRTABLE_TOKEN || "";
  
  // IDs das suas tabelas (conforme links fornecidos)
  export const TABLE_PORTFOLIO = "tblbbnjpPS1SKVdR3";
  export const TABLE_FEATURED_ARTIST = "tblP6mJLg6BE3PFsW";
  export const TABLE_CATALOG = "tbl8TfB4rZ6J8mwxM";
  
  /**
   * Busca todos os registros de uma tabela do Airtable (usando tableId).
   * @param tableId  Ex: "tblbbnjpPS1SKVdR3"
   * @param viewId   Ex: "viwCxofmowBZzmRC5" (opcional)
   */
  export async function getTableRecords(tableId: string, viewId?: string) {
    // Monta URL base
    let url = `https://api.airtable.com/v0/${BASE_ID}/${tableId}`;
  
    // Se quiser usar a View para filtrar/ordenar, acrescente como query param
    if (viewId) {
      url += `?view=${viewId}`;
    }


  
    const headers: HeadersInit = {};
    
    if (AIRTABLE_TOKEN) {
      headers.Authorization = `Bearer ${AIRTABLE_TOKEN}`;
    } else {
      console.warn('Token do Airtable não configurado. A requisição pode falhar.');
    }
  
    const resp = await fetch(url, {
      headers,
    });
  
    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('Erro na resposta:', resp.status, resp.statusText);
      console.error('Detalhes do erro:', errorText);
      throw new Error(`Erro ao buscar tabela ${tableId}: ${resp.statusText}`);
    }
  
    const data = await resp.json();
    return data.records as AirtableRecord[];
  }
  