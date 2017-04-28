var $ = require("jquery");

let brewtype = "simple";
let task = 0;
const nstasks = 4; // Number of tasks to be shown previuos and after current task (>2)
const b_simple = [
	"Revisar volumenes de agua en tabla"
	"Poner a calentar agua",
	"Agregar sales",
	"Preparar olla de macerado, con manguera para llenar por abajo",
	"Medir maltas y preparar en balde o bolsas",
	"Precalentar un poco la olla de macerado",
	"Preparar termometro",
	"Mash in",
	"Tomar muestra y medir PH",
	"agregar acido y tomar otra muestra",
	"Dejar todo tapado",
	"Poner a calentar agua para strike o lavado",
	"Agregar sales al agua de lavado",
	"Lavar y prepara bomba",
	"Preparar objetos para recircular",
	"Hervir agua y llenar erlenmayers",
	"Hacer Segundo Step si indica la receta",
	"Preparar olla de hervido y manguera de conexion con Klammern",
	"Recircular",
	"Empezar lavado",
	"Calentar olla de hervido",
	"Cuando se acaba el agua, subir ollas",
	"LLevar bagazo al compost",
	"Revolver constantemente",
	"Lavar olla de macerado",
	"Preparar lupulos en vasos",
	"Preparar irish moss",
	"Preparar timer para lupulos",
	"Medir volumen y densidad prehervor",
	"Empieza a hervir, activar timer",
	"Lavar espiral y conectar manguera, checkear perdidas",
	"Lavar y sanitizar fermentadores",
	"Terminar de hervir y meter espiral, checkear con Klammern"
	"Check volumen y densidad",
	"Agregar agua si hace falta",
	"Preparar levaduras",
	"Llenar fermentador e inocular levadura",
	"Poner en freezer con sensor sanitizado y ajustar temperatura",
	"Lavar espiral",
	"Lavar olla de hervido",
	"Ordenar todo",
	"Checkear tabla, anotar datos que falten"

];
let status = [];
// timer
let t;
let seconds = 0;
let minutes = 0;
let hours = 0;

$(document).ready(function() {
	$('input[type=radio][name=brewtype]').change(function() {
    	brewtype = this.value;
    });
    $('#btn_start').click(function () {
    	$('#app').empty();
    	switch (brewtype) {
    		case "simple":
    			loadapp(b_simple);
    			break;
    		case "double":
    			loadapp(b_double);
    			break;
    		default:
    			alert("Error with brewtype")
    	}
    })
})

function loadapp(tasks) {
	for (let i = 0; i < tasks.length; i++) {
  		status.push(false);
	}
	render(tasks)
	
	$(document).keydown(function(e) {
		switch(e.which) {
        	case 37: // left -> prev
        		if (task > 0) { task--; render(tasks) };
        		break;

        	case 38: // up -> prev
        		if (task > 0) { task--; render(tasks) };
        		break;

        	case 39: // right -> next
        		if (task < tasks.length - 1) { task++; render(tasks) };
        		break;

        	case 40: // down -> next
        		if (task < tasks.length - 1) { task++; render(tasks) };
        		break;

        	case 13: // Enter -> Toogle check
        		tooglecheck (tasks)
        		break;	

        	default: return; // exit this handler for other keys
    	}
    	e.preventDefault(); // prevent the default action (scroll / move caret)
	});
	var currentdate = new Date(); 
	var starttime = addZero(currentdate.getHours()) + ":"  + addZero(currentdate.getMinutes()) + " Hs";
	$("#Header-StartTime a span").html(starttime);
	timer();
}
function clickcheck (tasks) {
	$("#btn_check").click(function(){tooglecheck(tasks)});
}
function tooglecheck (tasks) {
if (status[task] == true) {
			status[task] = false;
			$("#btn_check").removeClass("green").addClass("grey");
		} else {
			status[task] = true;
			$("#btn_check").removeClass("grey").addClass("green");
		}
		renderCompletedTasks(tasks)

}
function renderCompletedTasks(tasks) {
	var sum = status.reduce((a, b) => a + b, 0);
	$("#Header-CompletedTasks a span").html(sum+"/"+tasks.length);
	if (sum == tasks.length) {
		clearTimeout(t);
		finish();
	}
}
function render(tasks) {
	$('#app').empty();
	$('#app').html("<div class='row'></div>")

	const fmin = 13;
	const fmax = 26;

	for (var i = task - nstasks; i < task; i++) {
		if (i >= 0) {
			var f = fmin + (i-task+nstasks)*(fmax-fmin)/(nstasks-1);
			if (status[i] == true) { var tc = "line-through"} else {var tc = "none"}
			$('#app .row').append("<div class='col s12 center-align' style='font-size: "+f+"px; text-decoration: "+tc+"'>"+tasks[i]+"</div>")
		}
	}
	if (status[task] == true) { var color = "green"} else {var color = "grey"}
	$('#app .row').append("<div class='col s12 center-align'><div class='card-panel'><h5 class='blue-text text-darken-2' >"+tasks[task]+"</h5><a id='btn_check' class='btn-floating horizontal waves-effect waves-light "+color+"'><i class='material-icons'>done</i></a></div></div>")
	clickcheck(tasks);
	for (var i = task + 1; i < task + nstasks + 1; i++) {
		if (i <= tasks.length-1) {
			var f = fmax - (i-task-1)*(fmax-fmin)/(nstasks-1);
			if (status[i] == true) { var tc = "line-through"} else {var tc = "none"}
			$('#app .row').append("<div class='col s12 center-align' style='font-size: "+f+"px; text-decoration: "+tc+"'>"+tasks[i]+"</div>")
		}
	}
	renderCompletedTasks(tasks)

}
function finish () {
	$('#app .row').empty();
	$('#app .row').append("<div class='col s12 center-align'><div class='card-panel'><h5 class='blue-text text-darken-2' >Listo!</h5></div></div>")
}
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    $("#Header-Timer a span").html((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
