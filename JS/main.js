//console.log("hi");

//----------------------------------------------------------------
//declare variables:

let add_div = {
    "vista": document.getElementById("vista1"),
    "data": document.getElementById("data_alumno"),
    "add": document.getElementById("add_alumno"),
    "send": document.getElementById("send_alumno")
};


let lista_materias_n = [];

//STARRED:

let lista_alumnos = [];

//----------------------------------------------------------------
//declare classes:


class estudiante{
    constructor(name, surnames, age){
        this.nombre = name;
        this.apellidos = surnames;
        this.edad = age;
        this.grupo = "N"; //A, B, C//
        this.materias_inscritas = [];
        this.calificaciones = [];
        this.promedio = 0;
    }

}


//----------------------------------------------------------------
//declare some functions of views:

function add_materia(){
    let div_all = document.createElement("div");

    let inp = document.createElement("input");
    inp.setAttribute("type", "text");
    inp.setAttribute("placeholder", "Matematicas")
    inp.setAttribute("name", "mater");

    let inp2 = document.createElement("input");
    inp2.setAttribute("type", "number");

    //labels:

    let lab1 = document.createElement("label");
    lab1.setAttribute("for", "mater");
    lab1.textContent = "Materia: ";

    let lab2 = document.createElement("label");
    lab2.setAttribute("for", "nota");
    lab2.textContent = "Nota: ";
    lab2.style.marginLeft = "1rem";
    
    inp2.setAttribute("min", 1);
    inp2.setAttribute("max", 10);
    inp2.setAttribute("value", 10);
    inp2.setAttribute("name", "nota");
    inp2.style.marginLeft = "1rem";
    inp2.style.width = "3rem";


    div_all.appendChild(lab1);
    div_all.appendChild(inp);
    div_all.appendChild(lab2);
    div_all.appendChild(inp2);


    div_all.setAttribute("class", "materia");
    div_all.style.color = "aliceblue";

    add_div.add.appendChild(div_all);

    lista_materias_n.push(div_all);
}


function get_alumno_data(){

    let nam = document.getElementById("nombre_alumno").value;
    let surnames = document.getElementById("apellidos_alumno").value;
    let age = document.getElementById('edad').value;
    let group = document.getElementById("grupo");

    let classmate = new estudiante(nam, surnames, age);
    classmate.grupo = group.value;

    for (let i = 0; i < lista_materias_n.length; i++) {
        const ele = lista_materias_n[i];
        
        let mat = ele.children[1].value;
        mat = mat.toLowerCase();
        classmate.materias_inscritas.push(mat);
        classmate.calificaciones.push(ele.children[3].value);
    }


    return classmate;
}

function addAlumno(){
    let alumn = get_alumno_data();
    if(alumn.nombre == ""){
        alert("Debe ingresar nombre del alumno!");
        return;
    }
    if(alumn.apellidos == ""){
        alert("Debe ingresar apellidos del alumno!");
        return;
    }
    if(alumn.edad <= 0){
        alert("Debe ingresar edad del alumno!");
        return;
    }
    if(alumn.grupo == "N"){
        alert("Debe ingresar grupo del alumno!");
        return;
    }

    if(alumn.materias_inscritas.includes("")){
        alert("Alumno tiene materias sin nombre!");
        return;
    }

    lista_alumnos.push(alumn);
    alert("Alumno Ingresado con Exito!");
    add_div.add.innerHTML = "";
    
    
    add_div.data.reset();
    lista_materias_n = [];
    add_materia();
/*
    let hj = JSON.stringify(lista_alumnos);
    localStorage.setItem("list", hj);
*/
}

var alums = [];

function alumnodiv(divgen, al){
    let divn = document.createElement("div");
    let label1 = document.createElement("label");
    let label2 = document.createElement("label");
    let label3 = document.createElement("label");
    let label4 = document.createElement("label");
    let label5 = document.createElement("label");
    let label6 = document.createElement("label");

    divn.setAttribute("class", "student_card");
    

    label1.textContent = ">Nombre: "+al.nombre;
    label2.textContent = ">Apellido/s: "+al.apellidos;
    label3.textContent = ">Edad: "+al.edad;
    label4.textContent = ">Grupo: "+al.grupo;

    let lab5 = "";
    for (let i = 0; i < al.materias_inscritas.length; i++) {
        const mat = al.materias_inscritas[i];
        const not = al.calificaciones[i];
        
        lab5 += "-"+mat+": "+not+" ";

    }
    let sum = 0;
    for (let i = 0; i < al.calificaciones.length; i++) {
        const el = al.calificaciones[i];
        sum += parseInt(el);
    }
    //console.log(sum);
    al.promedio = sum/al.calificaciones.length;

    label5.textContent = lab5;

    label6.textContent = ">Promedio: "+al.promedio;

    divn.appendChild(label1);
    divn.appendChild(label2);
    divn.appendChild(label3);
    divn.appendChild(label4);
    divn.appendChild(label5);
    divn.appendChild(label6);

    divgen.appendChild(divn);

    alums.push(divn);
}

function search_name(){
    let inp = document.getElementById("s_by_name");
    if(true){
        let alumnos_div = document.getElementById("alumns");
        alumnos_div.innerHTML = "";
        for (let i = 0; i < lista_alumnos.length; i++) {
            let eld = lista_alumnos[i].nombre.toLowerCase();
            if(eld.includes(inp.value.toLowerCase())){
                alumnodiv(alumnos_div, lista_alumnos[i]);
            }
        }
    }
}
function search_surn(){
    let inp = document.getElementById("s_by_surname");
    if(true){
        let alumnos_div = document.getElementById("alumns");
        alumnos_div.innerHTML = "";
        for (let i = 0; i < lista_alumnos.length; i++) {
            let eld = lista_alumnos[i].apellidos.toLowerCase();
            if(eld.includes(inp.value.toLowerCase())){
                alumnodiv(alumnos_div, lista_alumnos[i]);
            }
        }
    }
}

function ordenar(){
    mostrar_alumnos();
}

function mostrar_alumnos(){
    if(lista_alumnos.length > 0){
        let alumnos_div = document.getElementById("alumns");
        alumnos_div.innerHTML = "";
        let orden = document.getElementById("orden");
        if(orden.value == "1"){
            lista_alumnos.sort((a,b) => a.edad - b.edad);
            
        }
        else if(orden.value == "2"){
            lista_alumnos.sort((a,b) => b.edad - a.edad);
        }
        else if(orden.value == "3"){ 
            //lista_alumnos.sort((a,b) => b.
            //por notas egenerales...
            lista_alumnos.sort((a,b) => b.promedio - a.promedio);
        }
        lista_alumnos.forEach(el => {
            alumnodiv(alumnos_div, el);
        });


        calc_proms();
        //alumnos_div.innerHTML = lista_alumnos;
    }
}


function vista_alumnos(actor){
    let vista = document.getElementById("lista");
    vista.style.visibility = "visible";
    vista.style.display = "grid";

    actor.textContent = "Cerrar Lista "+String.fromCharCode(0x25B2);
    actor.setAttribute("onclick", "cerrar_vista(this);");

    mostrar_alumnos();
}

function cerrar_vista(actor){
    let vista = document.getElementById("lista");
    
    vista.style.visibility = "collapse";
    vista.style.display = "none";

    actor.textContent = "Ver Estudiantes "+String.fromCharCode(0x25BC);
    actor.setAttribute("onclick", "vista_alumnos(this);");
    alums = [];
    //console.log("cerrar");
}
//----------------------------------------------------------------



add_materia();

/*
if(localStorage.getItem("list")){
    lista_alumnos = (JSON.parse(localStorage.getItem("list")));
}
*/

function calc_proms(){
    let promG = document.getElementById("prom");
    let promA = document.getElementById("promA");
    let promB = document.getElementById("promB");
    let promC = document.getElementById("promC");


    let sumA=0, sumB=0, sumC= 0, sumG = 0;
    let cantA=0, cantB=0, cantC=0;
    for (let i = 0; i < lista_alumnos.length; i++) {
        const el = lista_alumnos[i];
        sumG += parseInt(el.promedio);
        if(el.grupo == "A"){
            sumA += parseInt(el.promedio);
            cantA+=1;
        }
        if(el.grupo == "B"){
            sumB += parseInt(el.promedio);
            cantB+=1;
        }
        if(el.grupo == "C"){
            sumC += parseInt(el.promedio);
            cantC+=1;
        }
    }

    promG.textContent = sumG/lista_alumnos.length;
    promA.textContent = sumA/cantA;
    promB.textContent = sumB/cantB;
    promC.textContent = sumB/cantB;
}