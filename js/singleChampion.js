const champDefinido = document.querySelector('.nameChampion')
const subtitleChampion = document.querySelector('.subtitleChampion')
const iconChampion = document.querySelector('.iconChampion')
const passiva = document.querySelector('.passiva')
const habQ = document.querySelector('.habQ')
const habW = document.querySelector('.habW')
const habE = document.querySelector('.habE')
const habR = document.querySelector('.habR')
const titlePage = document.querySelector('.titlePage')
const containerlogoData = document.querySelector('.containerlogoData')
const titleContainerDicas = document.querySelector('.titleContainerDicas')
const titleContainerContra = document.querySelector('.titleContainerContra')
const ulSkins = document.querySelector('.skins')

const params = new URLSearchParams(window.location.search);
const champion = params.get('champion');
const infoChampion = `https://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion/${champion}.json`


containerlogoData.addEventListener('click', () => {
    window.location.href = 'index.html'
})

titleContainerDicas.textContent = 'Dicas para jogar de ' + champion
titleContainerContra.textContent = 'Como jogar contra ' + champion
titlePage.textContent = champion + ' - Data LOL'
champDefinido.textContent = champion


async function viewChampion() {
    const dataChamp = await fetch(infoChampion)
    const champJson = await dataChamp.json()
    const skins = champJson.data[champion].skins

    let skinsChampion = []
    skins.forEach(async skin => {
        if (skin.num != 0) {
            skinsChampion += `
            <li class="skinSingle">
                <img src="img/skins/${champion}_${skin.num}.jpg" class="skin">
                <h4 class="nameSkin">${skin.name}</h4>
            </li>
            `
        }
        ulSkins.innerHTML = skinsChampion
    })


    const dicas = champJson.data[champion].allytips
    const contra = champJson.data[champion].enemytips
    let textDicas = []
    let textContra = []
    const ulDicas = document.querySelector('.ulDicas')
    const ulContra = document.querySelector('.ulContra')

    dicas.forEach(dica => {
        textDicas += `<li>${dica}</li>`

        ulDicas.innerHTML = textDicas
    })

    contra.forEach(contra => {
        textContra += `<li>${contra}</li>`

        ulContra.innerHTML = textContra
    })



    subtitleChampion.textContent = champJson.data[champion].title
    passiva.src = `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/passive/${champJson.data[champion].passive.image.full}`
    habQ.src = `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/${champJson.data[champion].spells[0].image.full}`
    habW.src = `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/${champJson.data[champion].spells[1].image.full}`
    habE.src = `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/${champJson.data[champion].spells[2].image.full}`
    habR.src = `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/${champJson.data[champion].spells[3].image.full}`
    iconChampion.src = `https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${champion}.png`
    document.body.style.backgroundImage = `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg)`

    // console.log(champJson.data[champion])
}

viewChampion()