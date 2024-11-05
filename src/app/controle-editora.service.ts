import { Injectable } from '@angular/core';
import { Editora } from './editora';

@Injectable({
  providedIn: 'root'
})
export class ControleEditoraService {

  // Define o atributo editoras com três elementos de exemplo
  private editoras: Array<Editora> = [
    { codEditora: 1, nome: 'Alta Books' },
    { codEditora: 2, nome: 'Pearson' },
    { codEditora: 3, nome: 'Addison Wesley' }
  ];

  constructor() {}

  // Método para retornar o vetor de editoras
  getEditoras(): Array<Editora> {
    return this.editoras;
  }

  // Método para retornar o nome da editora baseado no código
  getNomeEditora(codEditora: number): string | undefined {
    const editora = this.editoras.find(e => e.codEditora === codEditora);
    return editora ? editora.nome : undefined;
  }
}