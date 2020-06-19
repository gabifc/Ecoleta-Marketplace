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
    //  ( Parte 2 ) este input eu vou mudar o valor dele cada vez que a função getCities for chamada. A gunção getCities é chamada toda vez que eu troco o uf
    const stateInput = document.querySelector("input[name=state]")

    // ( event.target é o select e eu pego o valor dele)
    const ufValue = event.target.value // aqui eu seleciono o valor o id e coloco na url de modo interpolado para que possa ser utilizados todos os 27 ids dependendo da seleção do user.

    // ( Parte 2 ) tratando o retorno do link 
    const indexOfSelectedState = event.target.selectedIndex
    // ( Parte 2 ) aqui vai de 0 a 26 pq são 27 estados e para pegar dinamicamente qual option foi selecionado eu crio a const indexOfSelectedState
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` // url dinamica com a const ufValue

    // ( Parte 3 ) antes dele fazer a chamadada fetch no app eu limpo o campo e bloqueio ai ele vai la no api fetch buscar e quando tiver o novo estado selecionado ele entra nestas duas condições abaixo:cria um novo option com os valores e descloqueia para o user selecionar a cidade.
    // ( Parte 3 ) o campo cidade começa vazio e
    citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
    // ( Parte 3 ) deixo o campo bloqueado de novo
    citySelect.disabled = true

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


// **** O RETORNO DO LINK ( Parte 2 ) ****
// quando eu clico no botão enviar ele retorna estes dados no link. 
// http://127.0.0.1:5500/creat-point.html?name=&adress=&adress2=&uf=14&city=1400175

// uf e estado estão com seus ids / numeros. Existem duas opções para tratar este dado e enviar com o nome certinho, no front-end ou com o banco de dados no backend que seria salvando a id no banco de dados e usando novamente (fazendo outra chamada para o api).

// ***tratando estes dados do link no front-end***
// primeiro crio no HTML um input do tipo hidden
// quando clicar para submeter (sem selecionar nenhum estado) ele retorna http://127.0.0.1:5500/creat-point.html?name=&adress=&adress2=&uf=&state=
// o state está ali no final, mas não aparece nenhum input na tela. 
// vamos tratar dentro da função getCities ver a função acima. ver ( Parte 2 )
// depois de implementar os codigos ( Parte 2 ) acima acesso o console,  Elements, seleciono o input e quando eu selecionar um uf ele add o value="nome do estado selecionado"

// *** SELEÇÃO REPETIDA DE CIDADES ( Parte 3 ) ****
// identificamos o bug que quando uma UF é selecionado e carrega a lista cidades, se o user trocar para outro estado a lista de cidades não atualiza.
// para resolver eu preciso limpar o campo cidades a cada seleção de estado antes de fazer a chamada fetch do api. 


