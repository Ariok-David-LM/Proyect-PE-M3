var exampleModal = document.getElementById('exampleModal')
const contenedor = document.querySelector('#contenedor')
let pokemonesNormalizados = []
const searchElement = document.querySelector('#buscarInput')
const searchOption = document.querySelector('#inputGroupSelect01')
 
//Funcion para el envio de informacion entre boton y Modal
exampleModal.addEventListener('show.bs.modal', (event) => {
    var button = event.relatedTarget
    var name = button.getAttribute('data-name')
    var id = button.getAttribute('data-id')
    var tipo = button.getAttribute('data-tipo')
    var habilidad = button.getAttribute('data-habi')
    var atack = button.getAttribute('data-atack')
    var defense = button.getAttribute('data-defense')
    var imag = button.getAttribute('data-img')
    var modalTitle = exampleModal.querySelector('.modal-title')
    var identificador = exampleModal.querySelector('#ide')
    var tipDe = exampleModal.querySelector('#tipo')
    var habilidades = exampleModal.querySelector('#habilidades')
    var ataqueYDefensa = exampleModal.querySelector('#atackANDdef')
    var foto = exampleModal.querySelector('#imagen')
    foto.setAttribute('src', imag)
    modalTitle.textContent = name
    identificador.textContent = "ID: " + id
    tipDe.textContent = "Tipo: " + tipo
    habilidades.textContent = "Habilidades: " + habilidad
    ataqueYDefensa.textContent = "Ataque:" + atack + "    Defensa:" + defense
})

//Funcion para el evento de tecleo en la barra de busqueda
searchElement.addEventListener('keyup', (event) => {
    const inputText = event?.target?.value.toLocaleLowerCase() || ''
    let op = searchOption.value
    cleanView()
    const pokeFiltered = searching(inputText, op)
    pokeFiltered.forEach(element => {
        renderPokeCard(element)
    })
})

//Funcion para buscar y filtrar de acuerdo a las especificaciones dadas.
const searching = (text, op) => {
    const pokeFil = pokemonesNormalizados.filter(poke => {
        const name = poke.nombre
        return (name.toLocaleLowerCase()).includes(text)
    })
    let pokeFind
    if (op == 0) {
        pokeFind = pokeFil
    } else if (op == 1) {
        pokeFind = pokeFil.filter(pok => (Number(pok.ataque) > 0) && (Number(pok.ataque) <= 30))
    } else if (op == 2) {
        pokeFind = pokeFil.filter(pok => (Number(pok.ataque) > 30) && (Number(pok.ataque) <= 60))
    } else if (op == 3) {
        pokeFind = pokeFil.filter(pok => (Number(pok.ataque) > 60) && (Number(pok.ataque) <= 90))
    } else if (op == 4) {
        pokeFind = pokeFil.filter(pok => Number(pok.ataque) > 90)
    }
    return pokeFind
}

//Funcion para limpiar el contenedor de pokemones.
const cleanView = () => {
    contenedor.innerHTML = ''
}

//Funcion para crear el boton con la informacion necesaria del pokemon para el Modal.
const renderPokeCard = (element) => {
    const newButton = document.createElement('button')
    const newImg = document.createElement('img')
    newButton.classList.add('btn')
    newButton.classList.add('btn-primary')
    newButton.classList.add('me-3')
    newButton.classList.add('mt-3')
    newButton.setAttribute('type', 'button')
    newButton.setAttribute('data-bs-toggle', 'modal')
    newButton.setAttribute('data-bs-target', '#exampleModal')
    newButton.setAttribute('data-name', element.nombre.toUpperCase())
    newButton.setAttribute('data-id', element.identity)
    newButton.setAttribute('data-tipo', element.tipo)
    newButton.setAttribute('data-habi', element.habilidades)
    newButton.setAttribute('data-atack', element.ataque)
    newButton.setAttribute('data-defense', element.defensa)
    newButton.setAttribute('data-img', element.imagen)
    newImg.setAttribute('src', element.imagen)
    newImg.setAttribute('alt', element.nombre)
    newImg.setAttribute('width', '40')
    newImg.setAttribute('height', '40')
    newButton.innerHTML = element.nombre.toUpperCase()
    newButton.appendChild(newImg)
    contenedor.appendChild(newButton)
}

//Funcion para crear el array de pokemones con los datos necesarios para este proyecto.
const normalizePokemon = (data) => {
    let tipos = ""
    let habilidad = ""
    data.types.forEach(element => {
        tipos += element.type.name + ", "
    })
    data.abilities.forEach(element => {
        habilidad += element.ability.name + ", "
    });
    const poke = {
        nombre: data.name,
        imagen: data.sprites.other.dream_world.front_default,
        identity: data.id,
        tipo: tipos,
        habilidades: habilidad,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[3].base_stat
    }
    pokemonesNormalizados.push(poke)
    renderPokeCard(poke)
}

//Funcion para recargar y buscar con los nuevos parametros
const reload = () => {
    console.log('Me ejecute')
    const inputText = searchElement.value || ''
    let op = searchOption.value
    cleanView()
    const pokeFiltered = searching(inputText, op)
    pokeFiltered.forEach(element => {
        renderPokeCard(element)
    })
}

//Asignamos un listener para el select
searchOption.addEventListener('change', reload)

//Funcion para iniciar el funcionamiento de la pagina consultando la api
const main = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then((pokemones) => {
            pokemones.results.forEach(element => {
                fetch(`${element.url}`)
                    .then((response) => response.json())
                    .then((pokemon) => normalizePokemon(pokemon))
            });
        })
}



main()
