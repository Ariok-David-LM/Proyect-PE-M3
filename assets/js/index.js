var exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', (event) => {
  var button = event.relatedTarget
  var name = button.getAttribute('data-name')
  var id = button.getAttribute('data-id')
  var tipo = button.getAttribute('data-tipo')
  var habilidad = button.getAttribute('data-habi')
  var atack = button.getAttribute('data-atack')
  var defense = button.getAttribute('data-defense')
  var modalTitle = exampleModal.querySelector('.modal-title')
  var identificador = exampleModal.querySelector('#ide')
  var tipDe = exampleModal.querySelector('#tipo')
  var habilidades = exampleModal.querySelector('#habilidades')
  var ataqueYDefensa = exampleModal.querySelector('#atackANDdef')
  modalTitle.textContent = name
  identificador.textContent = "ID: " + id
  tipDe.textContent = "Tipo: " + tipo
  habilidades.textContent = "Habilidades: " + habilidad
  ataqueYDefensa.textContent = "Ataque:" + atack + "    Defensa:" + defense
})

const contenedor = document.querySelector('#contenedor')

const renderPokeCard = () => {
    const newButton = document.createElement('button')
    const newImg = document.createElement('img')
    newButton.classList.add('btn')
    newButton.classList.add('btn-primary')
    newButton.classList.add('me-3')
    newButton.setAttribute('type', 'button')
    newButton.setAttribute('data-bs-toggle','modal')
    newButton.setAttribute('data-bs-target','#exampleModal')
    newButton.setAttribute('data-name','cat')
    newButton.setAttribute('data-id','2')
    newButton.setAttribute('data-tipo','felinos')
    newButton.setAttribute('data-habi','correre')
    newButton.setAttribute('data-atack','152')
    newButton.setAttribute('data-defense','601')
    newImg.setAttribute('src','https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg')
    newImg.setAttribute('alt','imagem')
    newImg.setAttribute('width','40')
    newImg.setAttribute('height','40')
    newButton.innerHTML = 'pokemonsito  '
    newButton.appendChild(newImg)
    contenedor.appendChild(newButton)
}
 renderPokeCard()






const main = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then((pokemones) => {
            console.log(pokemones)
            pokemones.results.forEach(element => {
                fetch(`${element.url}`)
                .then((response) => response.json())
                .then((pokemon) => console.log(pokemon))
            });
        })
}
 main()