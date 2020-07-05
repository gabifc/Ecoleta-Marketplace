// importar a dependencia do SQlite3

// vai retornar um objeto que vai ser inserida na const
const sqlite3 = require("sqlite3").verbose()

// criar e iniciar o objeto de banco de dados que irá fazer as operações
const db = new sqlite3.Database("./src/database/database.db")

// DEPOIS de configurar o banco de dados, todas as etapas fazer o exports que será chamado no server.js
module.exports = db

// utilizar o objeto de banco de dados para nossas operações
// serialize roda uma sequencia de codigos. Aqui ele roda uma função anonima

// DESCOMENTAR AQUI O DB SERIALIZE E A FUNÇÂO QUE QUERO UTILIZAR NO TESTE
//db.serialize(() => {
    // Com comandos SQL eu vou:

    // *** 1 criar uma tabela ****

    // usando crase `` eu posso fazer quebra de linha se o codigo ficar grande. Com "" não dá
    // CREATE TABLE IF NOT EXISTES place (); = comando SQL = CRIAR UMA TABELA SE NÃO EXISTIR  nome da tabela(places)
    // depois eu crio os campos que eu quero: o primeiro é id, segundo image, adress...
    // o último não tem vírgula.
    // Essa sequencia cria uma tabela no SQlite - ele vai rodar essas linhas e verificar se já existe. Se ela já existe ele não faz nada se ela não existe ele cria.
    /*
    db.run(`
       CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
        );
    
    `)
*/

    // *** 2 inserir dados na tabela ***

    // INSERT INTO places () VALUES (); = colaca na places valores. No primeiro () eu coloco os campos e no segundo os valores
    // values VALUES (?,?,?,?,?,?,?); = uma ? para cada place. Estes valores serão trocados depois. Esta forma de escrever deixa eles dinâmicos
    /* Aqui foi o primeiro passo antes de transforma para const abaixo
 db.run(`
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
 `)
 */


    // 2.1 para ficar mais dinâmico eu crio uma const e coloco todos os valores depois das `` do db.run e chamo a const dentro dos () do db.run. Estes dados image, name,etc são os name definidos lá no html no form
    /*
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
    */

    // aqui eu chamo a const e passo o segundo parametro que é um array para fazer a troca dos ? do VALUES
    // dentro do array em cada posição eu coloco os dados lá da pagina search results. Copiei o lik da imagem, o nome da entidade (Coletoria) e assim sucessivamente.
    // faço a mesma coisa que em cima, crio uma const com os valores do array
    /*
    db.run(query, [
        "https://images.unsplash.com/photo-1518792528501-352f829886dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim America",
        "nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ])
*/

    //2.2 deixando o db run mais limpo colocando os valores do array em um const
    /*
    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "PaperSider",
        "Guilherme Gemballa, Jardim America",
        "nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]
    */

    // aqui coloco como parametro o query que é a criação da tabela com os campos que eu criei no passo 1, values são os valores a serem inseridos na tabela substituindo os ? e a função é uma callback.
    // função callback está chamando de volta depois que o query e o values executarem, mas enquanto o query e o value estão carregando o JS vai seguindo o código.
    // se der erro ele mostra no console, se não ele segue e mostra cadastro ok  + o this
    // o this referencia a resposta do run
    // aqui não pode usa => por causa do this
    /* separando a função para ficar mais legivel- fazer como o código abaixo
    db.run(query, values, function(err) {
        if(err) {
            console.log(err)
        }
        console.log("Cadastro ok")
        console.log(this)
    })
    */
    // 2.3 mesmo processo acima, separando a função e passando a referencia como parametro do db
    /*
    function afterInsertData(err) {
        if (err) {
            console.log(err)
        }
        console.log("Cadastro ok")
        console.log(this)
    }
    db.run(query, values, afterInsertData) //ESTA LINHA DEVE ESTAR NO CODIGO AO FIM DO PASSO 2
*/
    // quando chegar aqui rodar no terminal node src/database/db.js e tem que aparecer Cadastro OK mais os dados cadastrados. Para o passo 3, depois de ter o Cadastro funcionando eu devo comentar a linha 110 que deixará o query, value e a função apagadas.

    // *** 3 consultar os dados na tabela ***

    // a primeira coisa a fazer é comentar a linha 110 com o db run. Até este passo ela estava legivel
    // selecione todos os campos da tabela places. O primeiro argumento é uma query SQL, o * é tudo, que é para selecionar todos os campos da tabela e o nome da tabela.
    // O segundo argumento é um callback, uma função anonima que vai receber erro e rows que são os registros da tabela que virá em formado de array.
    // o * pode ser trocado por um campo específico, exemplo, quero só os nomes 
    //db.all(`SELECT name FROM places`, function(err, rows){
        /*
    db.all(`SELECT * FROM places`, function(err, rows){
        if (err) {
            console.log(err)
        }
        console.log("Aqui estão os registros da tabela places")
        console.log(rows)
    })
*/
    // 4 deletar um dado da tabela - para usar descomentar
    // para deletar tudo da tabela db.run(`DELETE FROM places`)
    // para deletar um dado específico eu uso WHERE e especifico o item e a posição/valor [1]
    // depois que deletar, chamo outra fução callback anonima para inserir o erro
    // sempre q inserir um novo item nunca será o mesmo id, mesmo que deletado.
        /*
        db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
            if (err) {
                console.log(err)
            }
            console.log("Registro deletado!")
        }) 
        */
// })  DESCOMENTAR È DO DB SERIALIZE