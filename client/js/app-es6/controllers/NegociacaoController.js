class NegociacaoController {

    constructor() {
        let elemento = document.querySelector.bind(document);
        this._inputData = elemento('#data');
        this._inputQuantidade = elemento("#quantidade");
        this._inputValor = elemento("#valor");

        this._listaNegociacao = new Bind(new ListaNegociacao(), new NegociacaoView(elemento("#negociacoesView")), 'add', 'esvazia', 'addAll', 'orderBy');

        this._mensagem = new Bind(new Mensagem(), new MensagemView(elemento("#mensagem")), 'texto');
        
        this._service = new NegociacaoService();

        this._init();


    }

    _init() {
        this._service.
            lista()
            .then(negociacoes =>  this._listaNegociacao.addAll(negociacoes))
            .catch(erro => this._mensagem.texto = erro);

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000)
    }

    adicionaNegociacao(event) {
        event.preventDefault();
        let negociacao = this._criaNegociacao();

        this._service.
            cadastra(negociacao).
            then(mensagem => {
                this._listaNegociacao.add(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
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

        this._service
            .apaga()
            .then(mensagem => {
                this._listaNegociacao.esvazia();

                this._mensagem.texto = mensagem
            }).catch(erro => this._mensagem.texto = erro);


    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    importaNegociacoes() {

        this._service.
        importa(this._listaNegociacao.negociacoes)
        .then(negociacoes => {
            this._listaNegociacao.addAll(negociacoes);
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