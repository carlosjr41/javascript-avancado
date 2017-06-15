'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = 'negociacoes';
    }

    _createClass(NegociacaoDao, [{
        key: 'adiciona',
        value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var request = _this._connection.transaction(_this._store, 'readwrite').objectStore(_this._store).add(negociacao);

                request.onsuccess = function (event) {
                    resolve("Negociação Salva com Sucesso");
                };

                request.onerror = function (event) {
                    console.log(event.target.error);
                    reject("não foi possivel adicionar a negociação");
                };
            });
        }
    }, {
        key: 'listaTodos',
        value: function listaTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var cursor = _this2._connection.transaction(['negociacoes'], 'readwrite').objectStore('negociacoes').openCursor();

                var negociacoes = [];

                cursor.onsuccess = function (event) {
                    var atual = event.target.result;
                    if (atual) {
                        var dado = atual.value;

                        negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                        atual.continue();
                    } else {
                        resolve(negociacoes);
                    }
                };

                cursor.onerror = function (event) {
                    console.log(event.target.error);
                    reject("Erro ao buscar todas as negociações");
                };
            });
        }
    }, {
        key: 'apagaTodos',
        value: function apagaTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var cursor = _this3._connection.transaction(['negociacoes'], 'readwrite').objectStore('negociacoes').clear();

                cursor.onsuccess = function (event) {
                    resolve("negociações apagadas com sucesso");
                };

                cursor.onerror = function (event) {
                    console.log(event.target.error);
                    reject("Erro ao apagar as negociações");
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map