import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  public livro: Livro = new Livro();       // Atributo 'livro' do tipo Livro, instanciado via construtor padrão
  public autoresForm: string = '';         // Atributo 'autoresForm' do tipo string, inicializado vazio
  public editoras: Array<Editora> = [];    // Atributo 'editoras' do tipo Array<Editora>, inicializado com um vetor vazio
  private servEditora: ControleEditoraService;
  private servLivros: ControleLivrosService;
  private router: Router;

  constructor(servEditora: ControleEditoraService, servLivros: ControleLivrosService, router: Router) {
    this.servEditora = servEditora;
    this.servLivros = servLivros;
    this.router = router;
  }

  ngOnInit(): void {
    // Preencher o vetor editoras com o método getEditoras do serviço servEditora
    this.editoras = this.servEditora.getEditoras();
  }

  // Método incluir, no estilo arrow function, para salvar o livro e navegar para a lista de livros
  incluir = () => {
    // Separar os autores a partir de quebras de linha e atribuir ao atributo autores do livro
    this.livro.autores = this.autoresForm.split('\n');
    // Incluir o livro no serviço de livros
    this.servLivros.incluir(this.livro);
    // Navegar para a rota '/lista'
    this.router.navigateByUrl('/lista');
  };
}