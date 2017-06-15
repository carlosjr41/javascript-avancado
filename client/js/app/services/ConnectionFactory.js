'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionFactory = function () {
    var stores = ['negociacoes'];
    var version = 4;
    var dbName = 'banco';

    var connection = null;

    var close = null;

    return function () {
        function ConnectionFactory() {
            _classCallCheck(this, ConnectionFactory);

            throw new Error("Não é possivel instanciar ConnectionFactory");
        }

        _createClass(ConnectionFactory, null, [{
            key: 'getConnection',
            value: function getConnection() {
                return new Promise(function (resolve, reject) {
                    var request = window.indexedDB.open(dbName, version);

                    request.onupgradeneeded = function (event) {
                        ConnectionFactory._createStores(event.target.result);
                    };

                    request.onsuccess = function (event) {

                        if (!connection) {
                            connection = event.target.result;
                            close = connection.close.bind(connection);
                            connection.close = function () {
                                throw new Error("Não é possivel chamar este método");
                            };
                        }
                        resolve(connection);
                    };

                    request.onerror = function (event) {
                        reject(event.target.error);
                    };
                });
            }
        }, {
            key: '_createStores',
            value: function _createStores(connection) {
                stores.forEach(function (store) {
                    if (connection.objectStoreNames.contains(store)) {
                        connection.deleteObjectStore(store);
                    }

                    connection.createObjectStore(store, { autoIncrement: true });
                });
            }
        }, {
            key: 'closeConnection',
            value: function closeConnection() {
                if (connection) {
                    close();
                    connection = null;
                }
            }
        }]);

        return ConnectionFactory;
    }();
}();
//# sourceMappingURL=ConnectionFactory.js.map