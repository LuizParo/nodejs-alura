module.exports = function(app) {
    app.get('/', function(req, res) {
        var connection = app.infra.connectionFactory();
        var produtoDAO = new app.infra.ProdutoDAO(connection);

        produtoDAO.lista(function(error, result) {
            if(error){
                return next(error);
            }

            res.render('home/index', {
                livros : result
            });
        });

        connection.end();
    });
}