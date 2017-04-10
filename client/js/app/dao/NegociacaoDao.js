class NegociacaoDao {
    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';

        
    }

    adiciona(negociacao){
        return new Promise((resolve,reject) => {
            let request = this._connection.
                transaction(this._store,'readwrite').
                objectStore(this._store).
                add(negociacao);

            
            request.onsuccess= event =>{
                console.log("Salvando negociacao no banco");
                resolve();
            };

            request.onerror = event =>{
                console.log(event.target.error);
                reject("não foi possivel adicionar a negociação");
            };

        });
    }

    listaTodos(){
        return new Promise((resolve,reject) => {
            let cursor = this._connection
                            .transaction(['negociacoes'], 'readwrite')
                            .objectStore('negociacoes')
                            .openCursor();

            let negociacoes = [];


            cursor.onsuccess = event =>{
                let atual = event.target.result;
                if (atual){
                    let dado = atual.value;
                    
                    negociacoes.push(new Negociacao(dado._data,dado._quantidade,dado._valor));
                    atual.continue();
                }
                else{
                    resolve(negociacoes);
                }
            }

            cursor.onerror = event =>{
                console.log(event.target.error);
                reject("Erro ao buscar todas as negociações");
            }
        });
    }

    apagaTodos(){
        return new Promise((resolve,reject) => {
            let cursor = this._connection
                            .transaction(['negociacoes'], 'readwrite')
                            .objectStore('negociacoes')
                            .clear();



            cursor.onsuccess = event =>{
                resolve("negociações apagadas com sucesso");
            }

            cursor.onerror = event =>{
                console.log(event.target.error);
                reject("Erro ao apagar as negociações");
            }
        });
    }

    
}