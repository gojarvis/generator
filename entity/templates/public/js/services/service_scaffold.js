//Articles service used for articles REST endpoint
window.app.factory("<%= _.camelize(name) %>s", function($resource){
	return $resource('<%= name %>s/:<%= name %>Id', {<%= name %>Id:'@_id'}, {update: {method: 'PUT'}});
});