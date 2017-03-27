(function(){
    'use strict';
    App.controller('ProductsController', ['$scope','$http','$state','ProductService',
        function($scope, $http, $state, ProductService){

            $scope.productsMessage = "products";

            $scope.item = {};

            console.log($scope.item+ " item<<");

            $scope.searchBar = "";
            ProductService.getProducts()
                .then(function(res){
                    $scope.items = res.data;
                    console.log($scope.items+" items");
                }, function(err){
                    console.log(err);
                });

            $scope.saveItemNotStringify = function () {
                ProductService.addItem(JSON.stringify($scope.item))
/*
                $http.post('/restful-services/stockApi/createItem/', JSON.stringify($scope.item))
*/
                    .then(function (res) {
                        console.log(res);
                    })
                    .then(function (err) {
                        console.log("error here: "+err);
                    })
            };

            $scope.create = function(){
                $state.go('app.createProduct');
            };

            $scope.clearAll = function () {
                $scope.searchBar = "";
                $scope.categories={tv: false, watch: false, laptop: false};
            };

            $scope.categories={tv: false, watch: false, laptop: false};

            $scope.viewProduct= function (id) {
                $state.go('app.product', {
                    stockItemId: JSON.stringify(id)
                });
            };

            $scope.addToCart = function (item) {

            }
        }])
        .filter('customFilter', function() {
        return function(items, categories) {
            if (angular.isDefined(categories)) {
                var filtered = [];
                angular.forEach(items, function (item) {
                    if (categories.tv == false && categories.watch == false && categories.laptop == false) {
                        filtered.push(item);
                    } else if (categories.tv == true && item.stockItem.category == "tv") {
                        filtered.push(item);
                    } else if (categories.watch == true && item.category == 'watch') {
                        filtered.push(item);
                    } else if (categories.laptop == true && item.stockItem.category == 'laptop') {
                        filtered.push(item);
                    }
                });
                return filtered;
            }
        };
    })
})();