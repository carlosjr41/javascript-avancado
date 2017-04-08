class NegociacaoController {

    constructor() {
        let elemento = document.querySelector.bind(document);
        this._inputData = elemento('#data');
        this._inputQuantidade = elemento("#quantidade");
        this._inputValor = elemento("#valor");
        let self = this;
        
        this._listaNegociacao = new Bind(new ListaNegociacao(),new NegociacaoView(elemento("#negociacoesView")),'add','esvazia','addAll');

        this._mensagem = new Bind(new Mensagem(),new MensagemView(elemento("#mensagem")),'texto');
        

    }

    adicionaNegociacao(event) {
        event.preventDefault();



        let negociacao = new Negociacao(
            DateHelper.stringToDate(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);

        this._listaNegociacao.add(negociacao);
        this._limpaFormulario();

        this._mensagem.texto = "Negociação adicionada com sucesso";
    }

    apagaNegociacao(event) {

        this._listaNegociacao.esvazia();

        this._mensagem.texto = "Negociações apagadas com sucesso."
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    importaNegociacoes(){
        let service = new NegociacaoService();
        service.obtemNegociacoesSemana((err,negociacoes) =>{
            if (err){
                this._mensagem.texto = err;
                return;
            }
            this._listaNegociacao.addAll(negociacoes);
            this._mensagem.texto = "Negociacões recebidas com sucesso";
        })
    }
}