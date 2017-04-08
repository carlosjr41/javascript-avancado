class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes() {

        return Promise.all([
            this.obtemNegociacoesSemana(),
            this.obtemNegociacoesSemanaAnterior(),
            this.obtemNegociacoesSemanaAnterior()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
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
}