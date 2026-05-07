// Criando servidor

//Buscando o protocolo http do Node.js
const http = require ('http');

const server = http.createServer((req,res) => {

//Buscando o tipo de requisição
console.log(req.method);

    //passsando a resposta do servidor com:
    //statusCode = 200;
    // tipo de resposta em um texto simples.
res.writeHead(200, {'Content-type': 'text/plain'});

//resposta do servidor renderizada na tela do navegador
res.end('Servidor funcionando!')
});

//indicação da porta para acesso ao servidor
server.listen(3000, () =>{
    console.log("O servidor está rodando em http://localhost:3000");
});