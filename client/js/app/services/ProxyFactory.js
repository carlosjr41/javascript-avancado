class ProxyFactory{

    static create(model,props,acao){
        return new Proxy(model, {
            get(target, prop, receiver) {
                if (props.includes(prop) && typeof (target[prop]) == "function") {
                    return function () {
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }

                }
                return Reflect.get(target,prop,receiver);
            },

            set(target,prop,value,receiver){
                if (props.includes(prop)){
                    target[prop] = value;
                    acao(target);
                }
                return Reflect.set(target,prop,value,receiver);
            }
        });
    }
}