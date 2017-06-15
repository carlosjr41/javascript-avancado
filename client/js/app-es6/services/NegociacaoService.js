class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes() {

        return Promise.all([
            this.obtemNegociacoesSemana(),
            this.obtemNegociacoesSemanaAnterior(),
            this.obtemNegociacoesSemanaRetrasada()
        ]).then(periodos => {
            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);
            return negociacoes;

        }).catch(erro => {
            console.log(erro);
            throw new Error("Erro ao obter negociações");
        });

    } 

    obtemNegociacoesSemana() {

        return this._http.get('negociacoes/semana').
            then(negociacoes =>
                negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor))
            ).catch(error => {
                console.log(error);
                throw new Error("Erro ao buscar negociacoes da semana");
            });


    }

    obtemNegociacoesSemanaAnterior() {
        return this._http.get('negociacoes/anterior').
            then(negociacoes =>
                negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor))
            ).catch(error => {
                console.log(error);
                throw new Error("Erro ao buscar negociacoes da semana anterior");
            });


    }

    obtemNegociacoesSemanaRetrasada() {
        return this._http.get('negociacoes/retrasada').
            then(negociacoes =>
                negociacoes.map(negociacao => new Negociacao(new Date(negociacao.data), negociacao.quantidade, negociacao.valor))
            ).catch(error => {
                console.log(error);
                throw new Error("Erro ao buscar negociacoes da semana retrasada");
            });


    }

    cadastra(negociacao){
        
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .catch(erro => { 
                throw new Error(erro);
            });
                
           
    }

    lista(){

        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => { 
                console.log(erro)
                throw new Error(erro);
            });
    }

    apaga(){
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection).apagaTodos())
            .catch(erro => {
                throw new Error(erro);
            });
    }

    importa(listaAtual){
        return this.obterNegociacoes()
            .then(negociacoes => {
                return negociacoes = negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.equals(negociacaoExistente)));
                
            }).catch(error =>{
                console.log(error);
                throw new Error("Não foi possivel importar negociações");
            });
    }
}