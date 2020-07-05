// criar e iniciar o servidor
// PASSO 1
// crio uma variavel e atribuo require e peço o express como parametro.
// Aqui é uma variavel que recebeu uma função
const express = require("express")

// executa o express que é uma variavel que recebeu uma função.
const server = express()

// BANCO DE DADOS: Essa linha só deve ser criada depois que fizer o BANCO DE DADOS
// Lá na pastaa db.js eu criei o modelu.exportes e aqui posso fazer o require
const db = require("./database/db")

//PASSO 4
// configurar a pasta public depois de configuar o caminho da home que não apareceu o style nem o assets
// Assim todas as vezes que eu fizer o pedido será enviado também a pasta public
server.use(express.static("public"))
// para ver se está chamando no navegador digitar localhost3000/styles/main.css
// para aparecer a pagina correta chama localhost3000


// CONFIGURANDO O REQ.BODY - fazer depois de colocar o metodo POST para pegar os dados ocultos da URL
server.use(express.urlencoded({ extended: true }))

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
    // return res.render("index.html", { title: "Um titulo"}) - no codigo dele esta assim **verificar**
    return res.render("index.html")
})
// esta primeira linha é o link localhost o conteudo que vem depois do "/" vai preencher depois do 3000
server.get("/create-point", (req, res) => {

    // DADOS DO FORM: req.query que pega os dados inseridos no form e colocados na url e envia para o banco de dados.
    // Depois de criar o server.post este req.query não funciona mais e deve ser comentado
    //console.log(req.query)

    //renderiza a pagina. é o endereço que eu coloquei na linha server.get("/create-point"
    return res.render("create-point.html")
})

// FAZER DEPOIS de trocar o data-id para nomes: criando um ponto no servidor seguro para não mostrar os dados coletados na URL. No HTML no form está action "/savepoint" method="POST"
server.post("/savepoint", (req, res) =>{
    // OUTRA SOLICITAÇÃO NO LUGAR DO REQ.QUERY (fazer depois de configurar o POST)
    // req.body: o corpo do formulário deve ser habilitado no experess (ver início da página)
    // depois de habilitar posso utilizá-lo
    //console.log(req.body) depois de ver aparecendo os dados cadastrados no form no terminal comentar e na fazer o codigo que irá inserir no banco de dados.

    // inserir dados do form (com o req.body ok) no banco de dados
    // estou colando aqui o trecho 2 inserir dados da pagina db
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
        }
        console.log("Cadastro ok")
        console.log(this)

    // o return aqui será executado quando o cadastro tiver sido inserido no banco de dados
        return res.send("POST OK")
    }
    db.run(query, values, afterInsertData)

/* Este trecho foi utilizado quando estava configurando o post.
Quando for configurar a inserção de dados o return vai para dentro do afterInsertData.
    // diferente do get aqui eu uso o res e não o req.
    return res.send("POST OK") // POST OK deve ser substituido por uma pagina com a mensagem cadastrado com sucesso!
    // Ao terminar esta parte o req.query não funciona mais e foi comentado. Agora crio acima a outra solicitação.
*/
})



// chamando a pagina search results. Abaixo ela está funcionando modificada já integrada com o banco de dados.
/*
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})
*/

// BANCO DE DADOS: aqui eu vou chamar o select criado no db.js para pegar os dados do banco de dados

server.get("/search", (req, res) => {
    
    // BANCO DE DADOS: chamando o db.all Select criado na db.js para pegar os dados do banco
    db.all(`SELECT * FROM places`, function(err, rows){
        if (err) {
            console.log(err)
        }
        // console para ver se a aplicação está funcionando, pode ser removido depois. 
        console.log("Aqui estão os registros da tabela places")
        console.log(rows)
        // essa linha precisa add o rows para executar. O rows só existe dentro da functions então tem que ser dentro das chaves.
        // Essa linha vai mostrar a pagina html search results com os dados do banco 

        //DEPOIS DE CRIAR O CARD DINAMICO: criar uma const com o tamanho do array do rows para mostrar quantos pontos foram encontrados. Depois de criar a const chamar no return dentro das chaves. Quando tem o mesmo nome posso chamar só como total, mas quando não tem tenho que colcoar total: total sendo o nome da variavel e depois o dado que quero.
        const total = rows.length

        return res.render("search-results.html", { places: rows, total })
    })


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



