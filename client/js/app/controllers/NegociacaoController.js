"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var elemento = document.querySelector.bind(document);
        this._inputData = elemento('#data');
        this._inputQuantidade = elemento("#quantidade");
        this._inputValor = elemento("#valor");

        this._listaNegociacao = new Bind(new ListaNegociacao(), new NegociacaoView(elemento("#negociacoesView")), 'add', 'esvazia', 'addAll', 'orderBy');

        this._mensagem = new Bind(new Mensagem(), new MensagemView(elemento("#mensagem")), 'texto');

        this._service = new NegociacaoService();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: "_init",
        value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
                return _this._listaNegociacao.addAll(negociacoes);
            }).catch(function (erro) {
                return _this._mensagem.texto = erro;
            });

            setInterval(function () {
                _this.importaNegociacoes();
            }, 3000);
        }
    }, {
        key: "adicionaNegociacao",
        value: function adicionaNegociacao(event) {
            var _this2 = this;

            event.preventDefault();
            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
                _this2._listaNegociacao.add(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._limpaFormulario();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: "_criaNegociacao",
        value: function _criaNegociacao() {
            var negociacao = new Negociacao(DateHelper.stringToDate(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));

            return negociacao;
        }
    }, {
        key: "apagaNegociacao",
        value: function apagaNegociacao(event) {
            var _this3 = this;

            this._service.apaga().then(function (mensagem) {
                _this3._listaNegociacao.esvazia();

                _this3._mensagem.texto = mensagem;
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: "_limpaFormulario",
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
        }
    }, {
        key: "importaNegociacoes",
        value: function importaNegociacoes() {
            var _this4 = this;

            this._service.importa(this._listaNegociacao.negociacoes).then(function (negociacoes) {
                _this4._listaNegociacao.addAll(negociacoes);
                _this4._mensagem.texto = "mensagens recebidas com sucesso";
            }).catch(function (error) {
                return _this4._mensagem.texto = error;
            });
        }
    }, {
        key: "ordenaLista",
        value: function ordenaLista(prop) {
            this._listaNegociacao.orderBy(prop);
        }
    }, {
        key: "sendPost",
        value: function sendPost(event) {
            event.preventDefault();
            console.log("Enviando post");
            var selector = document.querySelector.bind(document);
            inputData = selector('#data');
            inputQuantidade = selector('#quantidade');
            inputValor = selector('#valor');

            var negociacao = {
                data: inputData.value,
                quantidade: inputQuantidade.value,
                valor: inputValor.value
            };

            var http = new HttpService();

            http.post('/negociacoes', negociacao).then(function () {
                inputData.Value = '';
                inputQuantidade.Value = 1;
                inputValor.Value = 0.0;
                inputData.focus();
                alert('Negociação enviada com sucesso');
            }).catch(function (erro) {
                return alert('Não foi possivel enviar a requisição');
            });
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map