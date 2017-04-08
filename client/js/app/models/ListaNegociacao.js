class ListaNegociacao {
    constructor() {
        this._negociacoes = [];
        this._ordenado = '';
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    add(negociacao) {
        this._negociacoes.push(negociacao);
    }

    addAll(negociacoes) {
        this._negociacoes = this._negociacoes.concat(negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0);
    }

    get quantidadeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.quantidade, 0);
    }

    get valorTotal() {
        return this._negociacoes.reduce((total, n) => total + n.valor, 0);
    }


    orderBy(prop) {
        this._negociacoes = this._ordenado != prop ? this._negociacoes.sort((a, b) => a[prop] - b[prop]) : this._negociacoes.reverse();
        this._ordenado = prop;
    }





}