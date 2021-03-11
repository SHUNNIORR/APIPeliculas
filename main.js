const contenedorPelicula = document.querySelector('#contedor-peliculas');

const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarPeli);
})

function buscarPeli(e){
    e.preventDefault();
    const peliculaABuscar = document.querySelector('#buscar').value;

    //validar formulario
    consultarPeli(peliculaABuscar);
}
function consultarPeli(peliculaABuscar){
    const url=`http://www.omdbapi.com/?s=${peliculaABuscar}&apikey=6a5f5c92`;
    console.log(url);
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos=>{
            limpiarHtml();
            console.log(datos);
            datos.Search.map(peli=>{
                mostrarPelicula(peli);
            });
        })
        .catch(error=>{
            limpiarHtml();
                contenedorPelicula.innerHTML=`
                    <div class="bg-red-100">
                        <strong class="font-bold"> ERROR!</strong>
                        <span class="block"> No se encuentra la pelicula que desea buscar.</span>
                    </div>
                `;
                
        });
};
function  mostrarPelicula(peli){
    const{Poster:poster,Title:title,Type:type,Year:year}=peli;
    contenedorPelicula.innerHTML +=`
        <div style="padding:5px; border-radius:10px;" class="card mt-2 ">
        <div class="row">

        <div class="col-md-4 col-xs-4">
        <image
        style="
        border-radius:10px;
        width:200px;
        width: 50%;
        display: flex;
        margin-left: auto;
        margin-right: auto;
        " 
        class="img-fluid animate__pulse" src="${poster}"></image>
        </div>

        <div class="col-md-8 col-xs-8">
        <h1
        style="
            color:black;
            font-size:35px;
        "
        >${title}</h1>
        <p style="color:black;"><strong>tipo:</strong>${type}</p>
        <p style="color:black;"><strong>Año:</strong>${year}</p>
        </div>

        </div>
           
        </div>
    `

};
function limpiarHtml(){
    while(contenedorPelicula.firstChild){
        contenedorPelicula.removeChild(contenedorPelicula.firstChild);
    }
};