export class JuegoAgilidad {
    public numeroIngresado:Number;
    public gano:boolean = false;
    public primerNumero: number;
    public segundoNumero: number;
    public resultado: number;
    public operador: string;
    
    constructor(){

        this.primerNumero = Math.floor((Math.random() * 10) + 1);
        this.segundoNumero = Math.floor((Math.random() * 10) + 1);
        this.operador = this.getOperador();
        
        switch(this.operador){
            case '*':
                this.resultado = this.primerNumero * this.segundoNumero;
                break;
            case '-':
                this.resultado = this.primerNumero - this.segundoNumero;
                break;
            case '+':
                this.resultado = this.primerNumero + this.segundoNumero;
                break;
            case '/':
                this.resultado = this.primerNumero / this.segundoNumero;
                break;
        }
    }

    getOperador(){
        let temp = Math.floor((Math.random() * 4) + 1);

        switch(temp){
            case 1:
                return '*';
            case 2:
                return '+';
            case 3: 
                return '-';
            case 4:
                return '/';
        }
    }

    calcularGano(){
        this.gano = this.resultado == this.numeroIngresado;
    }

}
