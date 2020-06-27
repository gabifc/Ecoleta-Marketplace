// criar e iniciar o servidor
// PASSO 1
// crio uma variavel e atribuo require e peço o express como parametro.
// Aqui é uma variavel que recebeu uma função
const express = require("express")

// executa o express que é uma variavel que recebeu uma função.
const server = express()

//PASSO 4
// configurar a pasta public depois de configuar o caminho da home que não apareceu o style nem o assets
// Assim todas as vezes que eu fizer o pedido será enviado também a pasta public
server.use(express.static("public"))
// para ver se está chamando no navegador digitar localhost3000/styles/main.css
// para aparecer a pagina correta chama localhost3000

// PASSO 6 NUNJUCKS - utilizando o template engine
// para instalar no terminal npm install nunjucks
// crio a variavel e peço o modulo nunjucks no parametro
const nunjucks = require("nunjucks")
// nunjucks sendo configurado e o primeiro argumento é a pasta html que ele vai usar
// o segundo argumento é um objeto que a prim propriedade é o express server e a segunda é o noCache
// noCache ele guarda algumas coisas em memoria e devolve mais rapido. Faço alguma alteração no header, ex, e ele guarda no cache e devolve uma versão velha. Para evitar bugs de vir paginas velhas eu coloco true para não ter cache.
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

/*
PASSO 2
// configurar caminhos da app e testando, depois modifico no passo 3
// pagina inicial: crio a função com get e após a "/" lá do localhost eu tenho uma requisição req e uma resposta res
// após instalar o nodemon e startar a pagina a msg  deve aparecer.
server.get("/", (req, res) => {
    res.send("Olha eu aqui")
})*/
/*
//PASSO 3
// abrindo a pasta home no servidor. (no passo 7 este é modificado)
// depois de testar com a função acima, uso o send file = envie um arquivo e o argumento é qual arquivo
// uma variavel global __dirname + "" concateno com o nome da paste
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

// PASSO 5 - chamar as demais pastas (no passo 7 este é modificado)
server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
}) */

// Passo 7 trocar sendFile por required e deixar só o link html em string depois 
server.get("/", (req, res) => {
    return res.render("index.html")
})
// esta primeira linha é o link localhost o conteudo que vem depois do "/" vai preencher depois do 3000
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

/** EXEMPLO PARA DEIXAR DINAMICO COM O NUNJUCKS
 * server.get("/", (req, res) => {
    return res.render("index.html", { title: "NOVO TEXTOOO"})
})
 */

// PASSO 1
// ligar o servidor 
// a função ouve a porta 3000
server.listen(3000)



