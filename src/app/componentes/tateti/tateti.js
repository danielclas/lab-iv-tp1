

var tateti;

var empates = 0;
var ganadosComputadora = 0;
var ganadosHumano = 0;
var IDS = [['ceroCero', 'ceroUno', 'ceroDos'], ['unoCero', 'unoUno', 'unoDos'], ['dosCero', 'dosUno', 'dosDos']];

class Tateti {
    constructor(fichaH, turno) {
	   this.tablero = [
           [{ocupada: false, ficha: "", posicion: [0,0]},{ocupada: false, ficha: "", posicion: [0,1]}, {ocupada: false, ficha: "", posicion: [0,2]}],
           [{ocupada: false, ficha: "", posicion: [1,0]},{ocupada: false, ficha: "", posicion: [1,1]}, {ocupada: false, ficha: "", posicion: [1,2]}],
           [{ocupada: false, ficha: "", posicion: [2,0]},{ocupada: false, ficha: "", posicion: [2,1]}, {ocupada: false, ficha: "", posicion: [2,2]}]];
        this.fichaHumano = fichaH;
        this.fichaComputadora = (fichaH == 'X' )? 'O' : 'X';
        this.turno = turno,
        this.jugados = 0;
    }

	//métodos
    setFichaHumano(ficha){
      this.fichaHumano = ficha;
      this.fichaComputadora = (ficha == 'X' )? 'O' : 'X';
    }
	
	reset(fichaH, turno){
		this.tablero = 	[
            [{ocupada: false, ficha: "", posicion: [0,0]},{ocupada: false, ficha: "", posicion: [0,1]}, {ocupada: false, ficha: "", posicion: [0,2]}],
            [{ocupada: false, ficha: "", posicion: [1,0]},{ocupada: false, ficha: "", posicion: [1,1]}, {ocupada: false, ficha: "", posicion: [1,2]}],
            [{ocupada: false, ficha: "", posicion: [2,0]},{ocupada: false, ficha: "", posicion: [2,1]}, {ocupada: false, ficha: "", posicion: [2,2]}]];
        this.fichaHumano = fichaH;
		this.fichaComputadora = (fichaH == 'X' )? 'O' : 'X';
		this.turno = turno;
		this.jugados = 0;
	}

	agregarFicha(tipoFicha, fila, columna){
	  this.tablero[fila][columna].ocupada = true;
	  this.tablero[fila][columna].ficha = tipoFicha;
	}
	  
	estaOcupada(fila, columna){
	  return this.tablero[fila][columna].ocupada;
	}
	
	cambiarTurno(){
	  if (this.turno == 'c'){
	    this.turno = 'h';
	  } else {
	    this.turno = 'c';
	  }
	}
	
	mostrarTablero(){
        console.log("------------------");
        for (var i = 0; i < this.tablero.length; i++){
          var f = this.tablero[i];
          var c1 = f[0].ficha;
          var c2 = f[1].ficha;
          var c3 = f[2].ficha;
          var txt = "|  " + c1 + "  |  " + c2 + "  |  " + c3 + "  |";
          console.log(txt);
	    }
        console.log("------------------");
    }
	
	diagonales(){
	  var res = [];
	  res.push([]);
	  res.push([]);
	  res[0].push(this.tablero[0][0]);
	  res[0].push(this.tablero[1][1]);
	  res[0].push(this.tablero[2][2]);
	  res[1].push(this.tablero[0][2]);
	  res[1].push(this.tablero[1][1]);
	  res[1].push(this.tablero[2][0]);
	  return res;
	}
	
	columna(n){
	  var res = [];
	  for (var f of this.tablero){
	    res.push(f[n]);
	  }
	  return res;
	}
	
	columnas(){
	  var res = [];
	  res.push(this.columna(0));
	  res.push(this.columna(1));
	  res.push(this.columna(2));	  
	  return res;
	}
	
	estaTerminado(){
	  return tateti.estaLleno() || tateti.hay3EnLinea();
	}

    estaLleno(){
		return this.jugados >= 9;
	}

    hay3EnLinea(){
		var lineas = this.columnas().concat(this.tablero).concat(this.diagonales());
		for (var linea of lineas){
			if(this.hay3Iguales(linea)){
				return true;
			}
		}
		return false;
	}
    
	celdasVaciasDeLineasConDosOcupadas(ficha){
    	var lineas = this.columnas().concat(this.tablero).concat(this.diagonales());
    	var res = [];
    	for (var linea of lineas){
    		var tiene = this.tieneUnaSolaDesocupada(linea, ficha); //espero un array vacío o uno no vacío con dos elementos correspondientes a una posición de celda del tablero
    		if (tiene.length !== 0){
    			res.push(tiene);
    		}
    	}
    	return res;
    }

    tieneUnaSolaDesocupada(linea, tipoFicha){
    	//revisar y reescribir
    	var count = 0;
    	var posicion = [];
    	for (var celda of linea){
    		if (celda.ocupada){
    			if (celda.ficha === tipoFicha){
    				count++;
    			}
    		} else {
    			posicion = celda.posicion;
    		}
    	}
    	if (count === 2){
    		return posicion;
    	} else {
    		return [];
    	}
    }

	hay3Iguales(linea){
		var count = 0;
		var ficha = "";
		for (var celda of linea){
			if (celda.ocupada){
				if (ficha !== ""){
					if(ficha === celda.ficha){
						count++;
					} else {
						return false;
					}
				} else {
					ficha = celda.ficha;
					count++;
				}
			} else {
				return false;
			}
		}
		return count === 3;
	}
	
    desocupada(){
	  var posicion = [];
	  for (var i = 0; i < this.tablero.length; i++){
	    var f = this.tablero[i];	    
	    for (var j = 0; j < f.length; j++){
	      if(!this.estaOcupada(i,j)){
		posicion = [i, j];
		return posicion; 
	      }
	    }
	  }
	}
};


function jugadaHumano(celda, fila, columna){

    if(!tateti.estaTerminado()){
        if (!tateti.estaOcupada(fila, columna)){
            tateti.agregarFicha(tateti.fichaHumano, fila, columna);
            tateti.jugados += 1;
            mostrarCelda(celda, tateti.fichaHumano);
            tateti.mostrarTablero();
            
            if(tateti.estaTerminado()){
                actualizarMarcador('h');
                console.log("terminó Humano");
       	        tateti.reset(tateti.fichaHumano, 'h'); 
       	        limpiarCeldas();
			    mostrarTurno(tateti);
                mostrarMarcador();
                console.log("Humano: " + ganadosHumano + ". Computadora: " + ganadosComputadora + ". Empates: " + empates);
            } else {
                tateti.cambiarTurno();
                mostrarTurno(tateti);
                console.log("turno: " + tateti.turno);
                jugadaComputadora(tateti);
		    }
        } else {
            console.log('ocupada');
        }
    }
}

/* Jugada computadora */

function jugadaComputadora(tateti){
	if(!tateti.estaTerminado()){
		var posicion = tateti.desocupada();

	    var posiblesParaGanar = tateti.celdasVaciasDeLineasConDosOcupadas(tateti.fichaComputadora);
	    var posiblesParaBloquear = tateti.celdasVaciasDeLineasConDosOcupadas(tateti.fichaHumano);

	    if (posiblesParaGanar.length >= 1){
	    	posicion = posiblesParaGanar[Math.floor(Math.random()* posiblesParaGanar.length)];
		} else if (posiblesParaBloquear.length >= 1){
			posicion = posiblesParaBloquear[Math.floor(Math.random()* posiblesParaBloquear.length)];
		} else {
			if (!tateti.estaOcupada(1,1)) posicion = [1,1];
		}
		
	    var fila = posicion[0];
		var columna = posicion[1];
		tateti.agregarFicha(tateti.fichaComputadora, fila, columna);
		tateti.jugados +=1; 
	
		var celda = document.getElementById(IDS[fila][columna]); 
		mostrarCelda(celda, tateti.fichaComputadora);

        tateti.mostrarTablero();
      
		if(tateti.estaTerminado()){
            actualizarMarcador('c');
			console.log("terminó Computadora");
			tateti.reset(tateti.fichaHumano, 'h');
			limpiarCeldas();
			mostrarTurno(tateti);
            mostrarMarcador();
            console.log("Humano: " + ganadosHumano + ". Computadora: " + ganadosComputadora + ". Empates: " + empates);
		} else {
			tateti.cambiarTurno();
			mostrarTurno(tateti);
			console.log("turno: " + tateti.turno);
		}
	}
}

function actualizarMarcador(quienTermino){
    if (tateti.hay3EnLinea()){
        (quienTermino == 'h')? ganadosHumano++ : ganadosComputadora++;
    } else {
        empates++;
    }    
}

function mostrarMarcador(){
    var ganadosH = document.getElementById('ganadosH');
    var ganadosC = document.getElementById('ganadosC');
    var empate = document.getElementById('empate');
    
    ganadosC.textContent = "Computadora: " + ganadosComputadora;
    ganadosH.textContent = "Humano: " + ganadosHumano;
    empate.textContent = "Empate: " + empates;
}

function limpiarCeldas(){
	var celda;
	for (var fila of IDS){
		for (var id of fila){
			celda = document.getElementById(id);
			celda.textContent = "";
		}		
	}
}

function mostrarCelda(celda, ficha){
	celda.textContent = ficha;
}

function mostrarTurno(tateti){
	var display = document.getElementById('turno');
	display.textContent = 'Turno: ' + tateti.turno;
}

function eligeFicha(tipoFicha){

    tateti = new Tateti(tipoFicha, 'h');
        
    var celdas = document.getElementsByClassName("celda");

    //mostrar celdas
    for (var c of celdas){
        c.style.display = "inline-block";
    }
    
    //ocultar selección de ficha
    var ficha = document.getElementById("ficha");
    ficha.style.display = "none";
    
    //mostrar jugadores, turno y marcador
    var hum = document.getElementById("hum");
    var comp = document.getElementById("comp");
    var turno = document.getElementById("turno");
    var marcador = document.getElementsByClassName('marcador')[0];
    
    hum.textContent = "Humano juega con " + tateti.fichaHumano;
    comp.textContent = "Computadora juega con " + tateti.fichaComputadora; 
    turno.textContent = "Turno " + tateti.turno;
     
    jugadores.style.display = "block";
    turno.style.display = "block";
    marcador.style.display = "block";
    
    mostrarMarcador();
}
