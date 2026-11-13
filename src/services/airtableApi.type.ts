export interface IAirtableRecord {
  id: string;
  fields: {
    titulo_pagina?: string;
    titulo?: string;
    artistas?: string;
    descricao?: string;
    link?: string;
    Nome?: string;
    descricao_catalogo?: string;
    Videos?: string[];
    Playlist_link?: string;
  };
}
