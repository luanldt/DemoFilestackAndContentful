var contentful = require('contentful-management');

const ACCESS_TOKEN = '67e9c8852cb03e816798ded5fab8c602aecc10b5517c5c1027628352ddadb79b';

var client = contentful.createClient({
	accessToken: ACCESS_TOKEN
});

module.exports = function(fileData) {
	client.getSpace('l7xmugnc4kyt')
		.then(function(space) {
				space.createAsset(fileData)
					.then(function(asset){
						asset.processForAllLocales()
							.then(function(processedAsset){
								processedAsset.publish()
									.then(function(publishedAsset){
											console.log(publishedAsset);
									});
							});
					});
		});
}
