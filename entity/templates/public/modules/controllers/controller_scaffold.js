function <%= _.camelize(name) %>sController($scope, $routeParams, $location, Global, <%= _.camelize(name) %>s) {
	$scope.global = Global;

	$scope.create = function () {
		var <%= name %> = new <%= _.camelize(name) %>s({ title: this.title, content: this.content });
		<%= name %>.$save(function (response) {
			$location.path("<%= name %>s/" + response._id);
		});

		this.title = "";
		this.content = "";
	};

	$scope.remove = function (<%= name %>) {
		<%= name %>.$remove();

		for (var i in $scope.<%= name %>s) {
			if ($scope.<%= name %>s[i] == <%= name %>) {
				$scope.<%= name %>s.splice(i, 1)
			}
		}
	};

	$scope.update = function () {
		var <%= name %> = $scope.<%= name %>;
		if (!<%= name %>.updated) {
			<%= name %>.updated = [];
		}
		<%= name %>.updated.push(new Date().getTime());

		<%= name %>.$update(function () {
			$location.path('<%= name %>s/' + <%= name %>._id);
		});
	};

	$scope.find = function (query) {
		<%= _.camelize(name) %>s.query(query, function (<%= name %>s) {
			$scope.<%= name %>s = <%= name %>s;
		});
	};

	$scope.findOne = function () {
		<%= _.camelize(name) %>s.get({ <%= name %>Id: $routeParams.<%= name %>Id }, function (<%= name %>) {
			$scope.<%= name %> = <%= name %>;
		});
	};
}