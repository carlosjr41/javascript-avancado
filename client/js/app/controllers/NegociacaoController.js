class NegociacaoController {

    constructor() {
        let elemento = document.querySelector.bind(document);
        this._inputData = elemento('#data');
        this._inputQuantidade = elemento("#quantidade");
        this._inputValor = elemento("#valor");

        this._listaNegociacao = new Bind(new ListaNegociacao(), new NegociacaoView(elemento("#negociacoesView")), 'add', 'esvazia', 'addAll', 'orderBy');

        this._mensagem = new Bind(new Mensagem(), new MensagemView(elemento("#mensagem")), 'texto');

        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection).listaTodos())
            .then(negociacoes => this._listaNegociacao.addAll(negociacoes))
            .catch(erro => this._mensagem.texto = erro);


    }

    adicionaNegociacao(event) {
        event.preventDefault();

        ConnectionFactory.getConnection()
            .then(connection => {
                let negociacao = this._criaNegociacao();
                console.log(negociacao);
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacao.add(negociacao);
                        this._mensagem.texto = "Negociação adicionada com sucesso";
                        this._limpaFormulario();



                    })
            }).catch(erro => this._mensagem.texto = erro);





    }

    _criaNegociacao() {
        let negociacao = new Negociacao(
            DateHelper.stringToDate(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));

        return negociacao;
    }

    apagaNegociacao(event) {

        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection).apagaTodos())
            .then(mensagem => {
                this._listaNegociacao.esvazia();

                this._mensagem.texto = mensagem
            })
            .catch(erro => this._mensagem.texto = erro);


    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        service.obterNegociacoes()
            .then(negociacoes => {
                let arrayNegociacoes = negociacoes.reduce((saida, atual) => saida.concat(atual), []);
                this._listaNegociacao.addAll(arrayNegociacoes);
                this._mensagem.texto = "mensagens recebidas com sucesso";
            }).catch(error => this._mensagem.texto = error);




    }

    ordenaLista(prop) {
        this._listaNegociacao.orderBy(prop);
    }

    sendPost(event) {
        event.preventDefault();
        console.log("Enviando post");
        let selector = document.querySelector.bind(document);
        inputData = selector('#data');
        inputQuantidade = selector('#quantidade');
        inputValor = selector('#valor');

        let negociacao = {
            data: inputData.value,
            quantidade: inputQuantidade.value,
            valor: inputValor.value
        };

        let http = new HttpService();

        http.post('/negociacoes', negociacao).then(() => {
            inputData.Value = '';
            inputQuantidade.Value = 1;
            inputValor.Value = 0.0;
            inputData.focus();
            alert('Negociação enviada com sucesso');
        }).catch(erro => alert('Não foi possivel enviar a requisição'));

    }
}