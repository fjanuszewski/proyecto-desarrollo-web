const eventos = [{
        id: "1",
        titulo: "Camino a las sierras",
        fecha: "2022/11/15",
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A earum tempore ipsum temporibus quam, voluptas exercitationem corrupti cupiditate, quaerat assumenda iste natus deleniti quos ullam nam eius ducimus repellat reprehenderit"
    },
    {
        id: "2",
        titulo: "Ruteada bajo la luna",
        fecha: "2020/11/20",
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A earum tempore ipsum temporibus quam, voluptas exercitationem corrupti cupiditate, quaerat assumenda iste natus deleniti quos ullam nam eius ducimus repellat reprehenderit"
    },
    {
        id: "3",
        titulo: "Con el viento en la cara",
        fecha: "2022/12/06",
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A earum tempore ipsum temporibus quam, voluptas exercitationem corrupti cupiditate, quaerat assumenda iste natus deleniti quos ullam nam eius ducimus repellat reprehenderit"
    },
    {
        id: "4",
        titulo: "Curvas en el camino",
        fecha: "2023/01/24",
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A earum tempore ipsum temporibus quam, voluptas exercitationem corrupti cupiditate, quaerat assumenda iste natus deleniti quos ullam nam eius ducimus repellat reprehenderit"
    },
    {
        id: "5",
        titulo: "Curvas en el camino",
        fecha: "2023/02/15",
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A earum tempore ipsum temporibus quam, voluptas exercitationem corrupti cupiditate, quaerat assumenda iste natus deleniti quos ullam nam eius ducimus repellat reprehenderit"
    },
    {
        id: "6",
        titulo: "Curvas en el camino",
        fecha: "2023/02/25",
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A earum tempore ipsum temporibus quam, voluptas exercitationem corrupti cupiditate, quaerat assumenda iste natus deleniti quos ullam nam eius ducimus repellat reprehenderit"
    },
    {
        id: "7",
        titulo: "Curvas en el camino",
        fecha: "2023/04/03",
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A earum tempore ipsum temporibus quam, voluptas exercitationem corrupti cupiditate, quaerat assumenda iste natus deleniti quos ullam nam eius ducimus repellat reprehenderit"
    },
    {
        id: "8",
        titulo: "Curvas en el camino",
        fecha: "2023/04/14",
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A earum tempore ipsum temporibus quam, voluptas exercitationem corrupti cupiditate, quaerat assumenda iste natus deleniti quos ullam nam eius ducimus repellat reprehenderit"
    },
    {
        id: "9",
        titulo: "Curvas en el camino",
        fecha: "2023/05/20",
        descripcion: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A earum tempore ipsum temporibus quam, voluptas exercitationem corrupti cupiditate, quaerat assumenda iste natus deleniti quos ullam nam eius ducimus repellat reprehenderit"
    }
]

let btnBuscar = document.getElementById("btnBuscar")
btnBuscar.addEventListener("click", buscar)
let formFiltrar = document.getElementById("formFiltrar")
formFiltrar.addEventListener("submit", buscar)

//funcion buscar para filtrar los eventos que quiera el usuario

function buscar(event) {
    event.preventDefault()
    cargarEventos(eventos, new Date(getDateNow()).getTime()) //Reutilizamos la funcion de cargar eventos
    let fechaBuscar = document.getElementById("inputFechaBuscar").value
    if (fechaBuscar != '') {
        for (evento of eventos) {
            console.log(evento.innerHTML)
            if (!evento.fecha.includes(fechaBuscar)) {
                document.getElementById(`evento${evento.id}`).remove() //reutilizo el ID del evento para eliminarlo
            }
        }
    }
}

function cargarEventos(eventos,dateToday) {
    let gridEventos = document.getElementById("eventos")
    gridEventos.innerHTML = '' //Lo inicializamos en '' para que no se acumulen los eventos (prueben comentar esta linea y vean que pasa)

    for (const evento of eventos) {
        let dateEvent = new Date(evento.fecha).getTime();
        let classEvento = "eventos__evento"
        
        //Vamos a modificar el className segun la fecha del evento
        if (dateEvent < dateToday) {
            classEvento = classEvento + "-pasado" //eventos__evento-pasado
        } else if (dateEvent == dateToday) {
            classEvento = classEvento + "-activo" //eventos__evento-pasado
        }
        //Template para cargar eventos
        gridEventos.innerHTML = gridEventos.innerHTML + `<div class="${classEvento}" id="evento${evento.id}">
                            <div class="eventos__evento__titulo">
                                <h3>${evento.titulo}</h3>
                                <h4>${evento.fecha}</h4>
                            </div>
                            <div>
                                <p>${evento.descripcion}</p>
                            </div>
                            <div><img src="./assets/evento${evento.id}.jpg" alt="imagenEvento${evento.id}"></div>
                        </div>`
    }
}

//Esta funcion nos ayudara a obtener el formato de fechas necesario para comparar con la fecha del evento
function getDateNow() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // los meses empiezan en 0
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd; //Es para agregar el 0 adelante a los menores a 10
    if (mm < 10) mm = '0' + mm; //Es para agregar el 0 adelante a los menores a 10

    const formattedToday = yyyy + '/' + mm + '/' + dd;

    return formattedToday
}

let dateToday = new Date(getDateNow()).getTime(); //getTime me permite pasarla a un formato numerico el cual puedo comparar

//cargamos los eventos por primera vez
cargarEventos(eventos, dateToday)