class ProxyFactory{

    static create(model,props,acao){
        return new Proxy(model, {
            get(target, prop, receiver) {
                if (props.includes(prop) && typeof (target[prop]) == "function") {
                    return function () {
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    }

                }
                return Reflect.get(target,prop,receiver);
            },

            set(target,prop,value,receiver){
                let retorno = Reflect.set(target,prop,value,receiver);
                if (props.includes(prop)){
                    acao(target);
                }
                return retorno;
            }
        });
    }
}