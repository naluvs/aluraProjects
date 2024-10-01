export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        // return [...this.negociacoes]; Alternativa para o readOnly
        return this.negociacoes;
    }
}
