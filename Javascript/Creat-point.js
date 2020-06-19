// trabalhando com api IBGE para cidades e estados

// *** Selector Estados ***

// criando a função para trabalhar com o fetch
function populateUFs() {
    // selecionando o select uf
    const ufSelect = document.querySelector("select[name=uf]");
    // iniciando o fetch com o endereço do api
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        // função anonima que está retornando um valor em formato json
        .then( res => res.json() )
        // crio um loop para ele trazer os 27 estados - funçao anonima states
        .then( states => {
            // loop for of para: cada estado de estados pega um dos 27 estados e coloca dentro dessa const state e roda a condição que está dentro das {ufSelect...}
            for (const state of states) { // for of 
                // cada estado é um objeto então posso pegar cada propriedade que eu quiser. ${} se chama interpolar
                ufSelect.innerHTML += `<option value = "${state.id}"> ${state.nome}</option>`
            }
        })
}

populateUFs();

// selecionando o select uf
document.querySelector("select[name=uf]")
    // adiciono o ouvido de events com o evento change mundança e crio a função anonima arrow function
    // para ele mudar, no HTML inclui outro option com value 1, ver linha 58 do HTML.
    .addEventListener("change", () => { // getcities
        console.log("mudei")
    })


// **** Selector Cidades *****
/*
// para identificar a id da cidade eu posso dar console.log, mas preciso chamar a função com um parametro.
// o retorno do console será o id de cada estado selecionado
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    console.log(event.target.value)

    const url = `<option>`
}
document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)
*/

// seguindo com o código
function getCities(event) {
    // selecionando o select cidade
    const citySelect = document.querySelector("select[name=city]")

    // ( Parte 2 ) tratando o retorno do link, ver abaixo
    

    // ( event.target é o select e eu pego o valor dele)
    const ufValue = event.target.value // aqui eu seleciono o valor o id e coloco na url de modo interpolado para que possa ser utilizados todos os 27 ids dependendo da seleção do user.

    // ( Parte 2 ) tratando o retorno do link 
    

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` // url dinamica com a const ufValue

    //fetch para preencher o select cidade
    fetch(url)
    .then( res => res.json() )
    .then ( cities => {
        for ( const city of cities ){
            citySelect.innerHTML += `<option value = "${city.id}"> ${city.nome}</option>`
        }
        // no HTML está disable se não preenhcer o estado, para habilitar depois que o user seleciona o estado
        citySelect.disabled = false
    })

}

document
.querySelector("select[name=uf]") 
.addEventListener("change", getCities) // aqui chama a função getCities 




