var ConnectionFactory = (function () {
    const stores = ['negociacoes'];
    const version = 1;
    const dbName = 'banco';

    var connection = null;

    var close = null;

    return class ConnectionFactory {
        constructor() {
            throw new Error("Não é possivel instanciar ConnectionFactory");
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                let request = window.indexedDB.open(dbName, version);

                request.onupgradeneeded = event => {
                    ConnectionFactory._createStores(event.target.result);
                };

                request.onsuccess = event => {
                    
                    if (!connection){
                        connection = event.target.result
                        close = connection.close.bind(connection);
                        connection.close = function(){
                            throw new Error("Não é possivel chamar este método");
                        }
                    } 
                    resolve(connection);
                };

                request.onerror = event => {
                    reject(event.target.error);
                };
            })
        }

        static _createStores(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }

                connection.createObjectStore(store, { autoIncrement: true });
            });
        }

        static closeConnection(){
            if (connection){
                close();
                connection = null;
            }
        }
    }

})();

