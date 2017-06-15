"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: "obterNegociacoes",
        value: function obterNegociacoes() {

            return Promise.all([this.obtemNegociacoesSemana(), this.obtemNegociacoesSemanaAnterior(), this.obtemNegociacoesSemanaRetrasada()]).then(function (periodos) {
                var negociacoes = periodos.reduce(function (dados, periodo) {
                    return dados.concat(periodo);
                }, []);
                return negociacoes;
            }).catch(function (erro) {
                console.log(erro);
                throw new Error("Erro ao obter negociações");
            });
        }
    }, {
        key: "obtemNegociacoesSemana",
        value: function obtemNegociacoesSemana() {

            return this._http.get('negociacoes/semana').then(function (negociacoes) {
                return negociacoes.map(function (negociacao) {
                    return new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
                });
            }).catch(function (error) {
                console.log(error);
                throw new Error("Erro ao buscar negociacoes da semana");
            });
        }
    }, {
        key: "obtemNegociacoesSemanaAnterior",
        value: function obtemNegociacoesSemanaAnterior() {
            return this._http.get('negociacoes/anterior').then(function (negociacoes) {
                return negociacoes.map(function (negociacao) {
                    return new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
                });
            }).catch(function (error) {
                console.log(error);
                throw new Error("Erro ao buscar negociacoes da semana anterior");
            });
        }
    }, {
        key: "obtemNegociacoesSemanaRetrasada",
        value: function obtemNegociacoesSemanaRetrasada() {
            return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
                return negociacoes.map(function (negociacao) {
                    return new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
                });
            }).catch(function (error) {
                console.log(error);
                throw new Error("Erro ao buscar negociacoes da semana retrasada");
            });
        }
    }, {
        key: "cadastra",
        value: function cadastra(negociacao) {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: "lista",
        value: function lista() {

            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error(erro);
            });
        }
    }, {
        key: "apaga",
        value: function apaga() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection).apagaTodos();
            }).catch(function (erro) {
                throw new Error(erro);
            });
        }
    }, {
        key: "importa",
        value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes = negociacoes.filter(function (negociacao) {
                    return !listaAtual.some(function (negociacaoExistente) {
                        return negociacao.equals(negociacaoExistente);
                    });
                });
            }).catch(function (error) {
                console.log(error);
                throw new Error("Não foi possivel importar negociações");
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map