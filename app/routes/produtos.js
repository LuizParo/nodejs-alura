module.exports = function(app) {
    app.get('/produtos', function(req, res, next){
        var connection = app.infra.connectionFactory();
        var produtoDAO = new app.infra.ProdutoDAO(connection);

        produtoDAO.lista(function(err, result) {
            if(err){
                return next(err);
            }

            res.format({
                html : function() {
                    res.render('produtos/lista', {lista : result});
                },
                json : function() {
                    res.json(result);
                }
            });
        });

        connection.end();
    });

    app.get('/produtos/form', function(req, res) {
        res.render('produtos/form', {
            listaErros : {},
            produto : {}
        });
    });

    app.post('/produtos', function(req, res, next) {
        var connection = app.infra.connectionFactory();
        var produtoDAO = new app.infra.ProdutoDAO(connection);

        var produto = req.body;

        req.assert('titulo', 'Título não pode ser vazio').notEmpty();
        req.assert('preco', 'Preço deve ser numérico').isFloat();
        
        var erros = req.validationErrors();
        if(erros) {
            res.format({
                html : function() {
                    res.status(400).render('produtos/form', {
                        listaErros : erros,
                        produto : produto
                    });
                },
                json : function() {
                    res.status(400).json(erros);
                }
            });
            
            return;
        }

        produtoDAO.salva(produto, function(err, result) {
            if(err){
                return next(err);
            }

            res.redirect('/produtos');
        });

        connection.end();
    });

    app.delete('/produtos', function(req, res, next) {
        var connection = app.infra.connectionFactory();
        var produtoDAO = new app.infra.ProdutoDAO(connection);

        var id = req.body.id;
        produtoDAO.remove(id, function(err, result) {
            if(err){
                return next(err);
            }
            res.redirect('/produtos');
        });

        connection.end();
    });
}