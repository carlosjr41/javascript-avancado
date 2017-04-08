class ListaNegociacao{
    constructor (){
        this._negociacoes = [];
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    add(negociacao){
        this._negociacoes.push(negociacao);
    }

    addAll(negociacoes){
        this._negociacoes = this._negociacoes.concat(negociacoes);
    }

    esvazia(){
        this._negociacoes = [];
    }


}