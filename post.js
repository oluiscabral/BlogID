export default class Post {
    constructor(titulo, descricao, autor, categorias) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.autor = autor;
        this.categorias = categorias;
        this.data_criacao = new Date();
    }
}