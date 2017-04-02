class NegociacaoController {

    constructor() {
        this._inputData = document.querySelector('#data');
        this._inputQuantidade = document.querySelector("#quantidade");
        this._inputValor = document.querySelector("#valor");
        this._campoMensagem = document.querySelector("#mensagem");
        let self = this;

        this._listaNegociacao = ProxyFactory.create(
            new ListaNegociacao(),
            ['add', 'esvazia'],
            model => this._negociacaoView.update(model)
        );

        console.log(this._listaNegociacao);


        this._negociacaoView = new NegociacaoView(document.querySelector("#negociacoesView"));
        this._negociacaoView.update(this._listaNegociacao);

        this._mensagem = ProxyFactory.create(new MensagemView(), ['texto'], model => this._mensagemView.update(model));
        this._mensagemView = new MensagemView(this._campoMensagem);

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
}