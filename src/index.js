var $ = require("jquery");

let brewtype = "simple";
let task = 0;
const nstasks = 4; // Number of tasks to be shown previuos and after current task (>2)
const b_simple = [
	"Calentar agua",
	"Poner Malta",
	"Verificar temperatura",
	"Macerar",
	"Filtrar",
	"Hervir",
	"Enfriar",
	"Levadura",
	"Limpiar"
];
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
	let status = new Array(tasks.length).fill(false);
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

        	default: return; // exit this handler for other keys
    	}
    	e.preventDefault(); // prevent the default action (scroll / move caret)
	});
	$("header")
}

function render(tasks) {
	$('#app').empty();
	$('#app').html("<div class='row'></div>")

	const fmin = 13;
	const fmax = 26;

	for (var i = task - nstasks; i < task; i++) {
		if (i >= 0) {
			var f = fmin + (i-task+nstasks)*(fmax-fmin)/(nstasks-1);
			$('#app .row').append("<div class='col s12 center-align' style='font-size: "+f+"px'>"+tasks[i]+"</div>")
		}
	}
	$('#app .row').append("<div class='col s12 center-align'><div class='card-panel'><h5 class='blue-text text-darken-2'>"+tasks[task]+"</h5><a class='btn-floating horizontal waves-effect waves-light'><i class='material-icons'>done</i></a></div></div>")
	for (var i = task + 1; i < task + nstasks + 1; i++) {
		if (i <= tasks.length-1) {
			var f = fmax - (i-task-1)*(fmax-fmin)/(nstasks-1);
			$('#app .row').append("<div class='col s12 center-align' style='font-size: "+f+"px'>"+tasks[i]+"</div>")
		}
	}

}