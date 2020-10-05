export class Pais{

    public capital: String;
    public flag: String;
    public name: String;

    constructor(obj: any){
        this.capital = obj.capital;
        this.flag = obj.flag;
        this.name = obj.name;
    }

}