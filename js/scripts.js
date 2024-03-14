const imageChampion = document.querySelector('.imageChampion')
const dadosSearch = document.querySelector('.dadosSearch')
const containerChampions = document.querySelector('.allChampions')
const iptSearch = document.querySelector('.iptSearch')
const champions = 'https://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion.json'

async function viewChamp() {
    const championEscolhido = iptSearch.value
    if(iptSearch.value){
    const nomeChamp = championEscolhido[0].toUpperCase() + championEscolhido.substring(1)

    const dataFetch = await fetch(champions)
    const dataJson = await dataFetch.json()
    const championsJson = dataJson.data

    // Array com todos os nomes dos Campeões do LOL
    let allChampions = []

    const championsObject = Object.values(championsJson)
    championsObject.forEach(nomeChampion => {
        allChampions.push(nomeChampion.name)
    })
    let championsPreChosen = []
    const championChosen = allChampions.filter(champion => champion.startsWith(nomeChamp))
    championChosen.forEach(champion => {
        championsPreChosen += `
        <div class="dataChampion">
            <img src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${champion}.png" class="imageChampion">
            <h3 class="nameChampSearch">${champion}</h3>
        </div>
        `
        dadosSearch.style.display = 'block'
        containerChampions.innerHTML = championsPreChosen
    })
 } else {
    dadosSearch.style.display = 'none'
 }
 const dataChampion = document.querySelectorAll('.nameChampSearch')

 dataChampion.forEach(champ => {
    if(iptSearch.value){
        champ.addEventListener('click', (event) => {
            const clickChampion = event.target.closest('.dataChampion')
            const nomeChampClick = clickChampion.querySelector('.nameChampSearch').textContent
            window.location.href = `champion.html?champion=${nomeChampClick}`
            console.log(nomeChampClick)
        })
    }
 })
}

iptSearch.addEventListener('input', viewChamp)