var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'amenities';
    locals.data = {
        callout: []
    };


    // Load the posts
    view.on('init', function(next) {

        var q = keystone.list('Callout').model.find()
            .where('state', 'published');

        q.exec(function(err, results) {
            locals.data.callout = results;
            next(err);

            var firstCallout = results[0];
            console.log(firstCallout.title);
        });

    });

    // Render the view
    view.render('amenities');

}
