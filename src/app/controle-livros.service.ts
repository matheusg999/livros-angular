import { Injectable } from '@angular/core';
import { Livro } from './livro';

@Injectable({
  providedIn: 'root'
})

export class ControleLivrosService {
  // Definindo o atributo livros com alguns elementos
  private livros: Array<Livro> = [
    { codigo: 1, codEditora: 1, titulo: 'Use a cabeça: Java', resumo: 'Use a cabeça! Java é uma experiência completa de aprendizado em programação orientada a objetos(OO) e Java', autores: ['Bert Bates, Kathy Sierra'] },
    { codigo: 2, codEditora: 2, titulo: 'Java, como programar', resumo: 'Milhões de alunos e profissionais aprenderam programação e desenvolvimento de software com os livros Deitel', autores: ['Paul Deitel", "Harvey Deitel'] },
    { codigo: 3, codEditora: 3, titulo: 'Core Java for the impatien', resumo: "Readers familiar with Horstmann's original, two-volume 'Core Java' books who are looking for a comprehensive, but condensed guide to all of the new features and functions of Java SE 9 will learn how these new features impact the language and core libraries.", autores: ['Cay Horstmann'] }
  ];

  constructor() { }

  // Método que retorna o vetor livros
  obterLivros(): Array<Livro> {
    return this.livros;
  }

  // Método para incluir um novo livro no vetor
  incluir(livro: Livro): void {
    // Obtendo o código mais alto e incrementando para o novo livro
    const novoCodigo = (this.livros.length > 0) ? Math.max(...this.livros.map(l => l.codigo)) + 1
      : 1;
    livro.codigo = novoCodigo;

    // Adicionando o livro ao vetor
    this.livros.push(livro);
  }

  // Método para excluir um livro pelo código
  excluir(codigo: number): void {
    const index = this.livros.findIndex(l => l.codigo == codigo);
    if (index >= 0) {
      this.livros.splice(index, 1);
    }
  }
}