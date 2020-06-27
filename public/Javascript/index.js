// função de clicar no botão pesquisar para exibir e esconder o modal

// seleciono o botão
const buttonSearch = document.querySelector("#page-home main a");

// seleciono o modal inteiro e aplico o .remove na função abaixo para remover a class hide lá do html
const modal = document.querySelector("#modal");

// selecionando o x do span para aplicar a função para add a class hide
const close = document.querySelector("#modal .header a");

// função que quando ouvir o click no btn faz o modal aparecer removendo a class hide
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

// função para add a class hide ao clicar no X do span
close.addEventListener("click", () => {
    modal.classList.add("hide")
})