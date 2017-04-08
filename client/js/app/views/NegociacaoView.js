class NegociacaoView extends View{

    
    template(model){
        return ` 
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="controler.ordenaLista('data')">DATA</th>
                    <th onclick="controler.ordenaLista('quantidade')">QUANTIDADE</th>
                    <th onclick="controler.ordenaLista('valor')">VALOR</th>
                    <th onclick="controler.ordenaLista('volume')">VOLUME</th>
                </tr>
            </thead>

            <tbody>
            </tbody>
                ${model.negociacoes.map(n => 
                    `
                    <tr>
                        <td>${DateHelper.dateToString(n.data)}</td>
                        <td>${n.quantidade}</td>
                        <td>${n.valor}</td>
                        <td>${n.volume}</td>
                    </tr>
                    `
                ).join('')}
            <tfoot>
                <td colspan="1"></td>
                <td>${model.quantidadeTotal}</td>
                <td>${model.valorTotal}</td>
                <td>${model.volumeTotal}</td>
            </tfoot>
        </table>
        `;
    }

   
}