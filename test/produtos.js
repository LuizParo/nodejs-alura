var express = require('../config/express')()
var request = require('supertest')(express);

describe('#ProdutosController', function() {
    beforeEach(function(done) {
        var connection = express.infra.connectionFactory();            
        connection.query("delete from livros", function(ex, result) {
            if(!ex){
                done();
            }
        });
    });

    it('#listagem de produtos json', function(done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200, done);
    });

    it('#cadastro de um novo produto com dados invalidos', function(done) {
        request.post('/produtos')
            .send({
                titulo : 'titulo 1',
                descricao : 'descricao livro 1'
            })
            .expect(400, done);
    });

    it('#cadastro de um novo produto com tudo preenchido', function(done) {
        request.post('/produtos')
            .send({
                titulo : 'livro 1',
                descricao : 'descricao livro 1',
                preco : 20.50
            })
            .expect(302, done);
    });
});