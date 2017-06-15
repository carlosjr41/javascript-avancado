'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListaNegociacao = function () {
    function ListaNegociacao() {
        _classCallCheck(this, ListaNegociacao);

        this._negociacoes = [];
        this._ordenado = '';
    }

    _createClass(ListaNegociacao, [{
        key: 'add',
        value: function add(negociacao) {
            this._negociacoes.push(negociacao);
        }
    }, {
        key: 'addAll',
        value: function addAll(negociacoes) {
            this._negociacoes = this._negociacoes.concat(negociacoes);
        }
    }, {
        key: 'esvazia',
        value: function esvazia() {
            this._negociacoes = [];
        }
    }, {
        key: 'orderBy',
        value: function orderBy(prop) {
            this._negociacoes = this._ordenado != prop ? this._negociacoes.sort(function (a, b) {
                return a[prop] - b[prop];
            }) : this._negociacoes.reverse();
            this._ordenado = prop;
        }
    }, {
        key: 'negociacoes',
        get: function get() {
            return [].concat(this._negociacoes);
        }
    }, {
        key: 'volumeTotal',
        get: function get() {
            return this._negociacoes.reduce(function (total, n) {
                return total + parseFloat(n.volume);
            }, 0);
        }
    }, {
        key: 'quantidadeTotal',
        get: function get() {
            return this._negociacoes.reduce(function (total, n) {
                return total + parseInt(n.quantidade);
            }, 0);
        }
    }, {
        key: 'valorTotal',
        get: function get() {
            return this._negociacoes.reduce(function (total, n) {
                return total + parseFloat(n.valor);
            }, 0);
        }
    }]);

    return ListaNegociacao;
}();
//# sourceMappingURL=ListaNegociacao.js.map