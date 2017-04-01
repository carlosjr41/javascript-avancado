class NegociacaoController{

    constructor(){
        this._inputData = document.querySelector('#data');
        this._inputQuantidade = document.querySelector("#quantidade");
        this._inputValor = document.querySelector("#valor");
        this._campoMensagem = document.querySelector("#mensagem");

        this._listaNegociacao = new ListaNegociacao();

        this._negociacaoView = new NegociacaoView(document.querySelector("#negociacoesView"));
        this._negociacaoView.update(this._listaNegociacao);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView(this._campoMensagem);
        
    }

    adicionaNegociacao(event){
        event.preventDefault();
        

        
        let negociacao = new Negociacao(
            DateHelper.stringToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
        
        this._listaNegociacao.add(negociacao);
        this._limpaFormulario();
        this._negociacaoView.update(this._listaNegociacao);

        this._mensagem.texto="Negociação adicionada com sucesso";
        this._mensagemView.update(this._mensagem);
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}