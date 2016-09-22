module.exports = function(app) {
    app.get('/promocoes', function(req, res) {
        var connection = app.infra.connectionFactory();
        var produtoDAO = new app.infra.ProdutoDAO(connection);

        produtoDAO.lista(function(error, result) {
            if(error){
                return next(error);
            }

            res.render('promocoes/form', {
                livros : result
            });
        });

        connection.end();
    });

    app.post('/promocoes', function(req, res) {
        var promocao = req.body;

        app.get('io').emit('novaPromocao', promocao);
        res.redirect('/promocoes');
    });
}