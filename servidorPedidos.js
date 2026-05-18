// 06/05/2026: Atividade Criando Servidor de Pedidos - Node.js - aula 3

const http = require('http');


//array de pedidos
let pedidos = [
    {
        id: 1,
        cliente: "Patrícia",
        produto: "Pizza de mussarela",
        status: "Em preparo",
    },
];

//criando servidor
const server = http.createServer((req, res) =>{
    const method = req.method;
    const url = req.url;
    res.setHeader('Content-Type', 'application/json');

    //método GET (busca)
    if (url === '/pedidos' && method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify(pedidos));
        return;
    };          

    //método POST (envia)
    if (url === '/pedidos' && method === 'POST') {
        let body = '';  
        req.on('data', (parte) => {
            body += parte;
        });
        req.on('end', () => {
            const novoPedido = JSON.parse(body);
            pedidos.push(novoPedido);
            res.statusCode = 201; //201 quer dizer criado

            res.end(JSON.stringify({
                mensagem: 'Pedido realizado com sucesso',
                pedido: novoPedido,
            }));
        });
        return;
    };

    //método PUT (atualiza)
    if (url === '/pedidos/' && method === 'PUT') {
        let body = '';

        req.on('data', (parte) => {
            body += parte;
        });
        req.on('end', () => {
            const pedidoAtualizado = JSON.parse(body);
            
            pedido = pedidos.map((pedido) => {
                if (pedido.id === pedidoAtualizado.id) {
                    return pedidoAtualizado;
                }
                return pedido;
            });

                res.statusCode = 200;
                res.end(JSON.stringify({
                    mensagem: 'Pedido atualizado com sucesso',
                    pedidos: pedidos,
                }));

                //método DELETE (deleta)
            if (url === '/pedidos/' && method === 'DELETE') {
                let body = '';      
                req.on('data', (parte) => {
                    body += parte;
                });
                req.on('end', () => {
                    const pedidoDeletado = JSON.parse(body);
                    pedidos = pedidos.filter((pedido) => pedido.id !== pedidoDeletado.id);
                    res.statusCode = 200;
                    res.end(JSON.stringify({
                        mensagem: 'Pedido deletado com sucesso',
                        pedidos: pedidos,
                    }));
                });
            }
        });
    }});
    server.listen(3000, () => {
        console.log("Servidor rodando em http://localhost:3000/pedidos");
    });

    