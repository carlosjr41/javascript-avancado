class DateHelper{

    constructor(){
        throw new Error("DateHelper não pode ser instanciada");
    }
    
    static dateToString(date){
        return date.toLocaleDateString();
    }

    static stringToDate(string){
        if (!/\d{4}-\d{2}-\d{2}/.test(string))
            throw new Error("Data deve ser no formato yyyy-mm-dd");
        
        return new Date(...string.split('-').map((item,indice) => item - indice % 2));
    }
}