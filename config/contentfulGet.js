var contentful = require('contentful');

var client = contentful.createClient({
    space: 'l7xmugnc4kyt',
    accessToken: '9ce69b12da2af21259c033444ff991b94c3194b376e3e56b4891879bba40e71e'
});
module.exports = function(callback) {
    client.getAssets()
        .then(function (assets) {
            callback(JSON.stringify(assets));
        })
        .catch(function (e) {
            console.log(e);
        });
}