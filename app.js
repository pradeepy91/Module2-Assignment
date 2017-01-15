(function(){
  'use strict'
  var myApp = angular.module("ShoppingListCheckOff",[]);
  myApp.controller("ToBuyController",ToBuyController);
  myApp.controller("AlreadyBoughtController",AlreadyBoughtController);
  myApp.service("ShoppingListCheckOffService",ShoppingListCheckOffService);
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getBuyItems();
    toBuy.addItem = function (index) {
      var item = toBuy.items[index];
      ShoppingListCheckOffService.addItem(item.name,item.quantity,index);
      console.log("Items legnth in Buy items,",toBuy.items.length);
      if(toBuy.items.length<=0){
        toBuy.errorMessage ="Everything is bought!"
      }
    };
  }
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService','$scope']
  function AlreadyBoughtController(ShoppingListCheckOffService,$scope){
    var boughtList = this;
    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
    boughtList.errorMessage = function (){
      return ShoppingListCheckOffService.getErrorMessage();
    };
    //boughtList.errorMessage= ShoppingListCheckOffService.getErrorMessage();
  }
  function ShoppingListCheckOffService() {
    var service = this;
    var items = [
      {name:'Cookies',quantity:10},
      {name:'Chips',quantity:10},
      {name:'Biscuits',quantity:10},
      {name:'Chocolate',quantity:10 },
      {name:'Sweets',quantity:10 }
    ];
    var toBuyItems = items;
    var boughtItems =[];

    service.addItem = function (itemName,quantity,index) {
      var item ={
        name:itemName,
        quantity:quantity
      };
      toBuyItems.splice(index,1);
      boughtItems.push(item);
    };

    service.removeitem = function (index) {
      console.log("service");
      items.splice(index,1);
    };

    service.getBuyItems = function(){
      return toBuyItems;
    };
    service.getBoughtItems = function () {
      return boughtItems;
    };
    service.getErrorMessage = function () {
      if(boughtItems.length <= 0){
        return "Nothing Bought yet!";
      }
      return "";
    };
  }

})();
