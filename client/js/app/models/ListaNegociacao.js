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

    esvazia(){
        this._negociacoes = [];
    }


}