const http = require("http");

//simula um "banco de dados" em memória
// array de objetos
let livros = [
  {
    id: 1,
    titulo: "O pequeno Principe",
    autor: "Antonie de Saint-Exupéry",
  },
];

//Criando o servidor
const server = http.createServer((req, res) => {
  //armazenando o método requerido
  const method = req.method;
  //armazenando a URL da requisição
  const url = req.url;

  res.setHeader("Content-Type", "application/json");

  //Método GET (BUSCA)
  if (url === "/livros" && method === "GET") {
    //Status 200 =sucesso
    res.statusCode = 200;

    //Retorna a lista de livros em formato JSON
    res.end(JSON.stringify(livros)); //vai pegar uma string e transformar em textos

    return; //ENCERRA A REQUISIÇÃO
  };

  //MÉTODO POST (ENVIA)
  if (url === "/livros" && method === "POST") {
    let body = "";

    //on inicio de uma ação
    //data = inicio da informação, assim como fim = end
    //parte = varias partes que iremos receber da requisição
    req.on("data", (parte) => {
      body += parte;
    });
    req.on("end", () => {
      const novoLivro = JSON.parse(body);

      livros.push(novoLivro);
      res.statusCode = 201; //201 quer dizer criado

      res.end(
        JSON.stringify({
          mensagem: "Livro cadastrado com sucesso",
          livro: novoLivro,
        }),
      );
    });
    return;
  };

  //MÉTODO PUT (ATUALIZA)
  if (url === "/livros" && method === "PUT") {
    let body = "";

    req.on("data", (parte) => {
      body += parte;
    });

    req.on("end", () => {
      const livroAtualizado = JSON.parse(body);

      livros = livros.map((livro) => {
        if (livro.id === livroAtualizado.id) {
          return livroAtualizado; //livro atualizado retorna aqui
        }
        return livro; //retorna o mapeamento
      });

      res.statusCode = 200; //sucesso

      res.end(
        JSON.stringify({
          mensagem: "livro atualizado",
          livros: livros, //vai aparecer a mensagem e em seguida todos os livros
        }),
      );
    });
    return;
  };

  //MÉTODO DELETE
  if (url === "/livros" && method === "DELETE") {
    let body = "";
    req.on("data", (parte) => {
      body += parte;
    });

    req.on("end", () => {
      const dados = JSON.parse(body);
      livros = livros.filter(livro => livro.id !== dados.id);

      res.statusCode = 200;

      res.end(JSON. stringify({
        mensagem: 'livro removido com sucesso',
      }));
    });

    return;    
  };

  res.statusCode = 404;

  res.end(JSON.stringify({
    mensagem: 'Rota não encontrada'
  }));
});

server.listen(3000, () => {
  console.log("Servidor didponível em: http://localhost:3000/livros");
});
