class NegociacaoService{

    obtemNegociacoesSemana(callback){
        let xhr = new XMLHttpRequest();
        xhr.open("GET","negociacoes/semana");

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4){
                if (xhr.status == 200){
                    console.log(xhr.responseText);
                    
                    let resposta = JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor));
                    callback(null,resposta);
                }
                else{
                    console.log(xhr.responseText);
                    callback("Erro ao importar negociações");
                }
            }
        }

        xhr.send();
    }
}