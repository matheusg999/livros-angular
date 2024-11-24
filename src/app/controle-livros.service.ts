import { Injectable } from '@angular/core';
import {Livro}  from './livro';

const baseURL = "http://localhost:3030/livros"; // Endereço do servidor Express


interface LivroMongo {
  _id?: string;  
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root'
})

export class ControleLivrosService {

  constructor() { }

  
  async obterLivros(): Promise<Livro[]> {
    try {
      const response = await fetch(baseURL);
      
      if (!response.ok) {
        throw new Error(`Falha ao buscar livros: ${response.statusText}`);
      }

      const livrosMongo: LivroMongo[] = await response.json();

      
      return livrosMongo.map(livro => ({
        _id: livro._id || '',  
        codEditora: livro.codEditora,
        titulo: livro.titulo,
        resumo: livro.resumo,
        autores: livro.autores
      }));
    } catch (error) {
      console.error("Erro ao obter livros:", error);
      throw error;
    }
  }

  
  async excluir(codigo: string): Promise<boolean> {
    try {
      const response = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Falha ao excluir livro: ${response.statusText}`);
      }

      const data = await response.json();
      return data.ok || false;  
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      return false;
    }
  }

  
  async incluir(livro: Livro): Promise<boolean> {
    try {
      
      const livroMongo: LivroMongo = {
        codEditora: livro.codEditora,
        titulo: livro.titulo,
        resumo: livro.resumo,
        autores: livro.autores
      };

      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroMongo),
      });

      if (!response.ok) {
        throw new Error(`Falha ao incluir livro: ${response.statusText}`);
      }

      const data = await response.json();
      return data.ok || false; 
    } catch (error) {
      console.error("Erro ao incluir livro:", error);
      return false;
    }
  }
}