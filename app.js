console.log("Starting Password Manager");
var storage = require('node-persist');
//Initialize Storage Sync
storage.initSync();
//Push Storage Data
var accounts = storage.getItemSync('accounts');

//Immediately Invoked Function that grabs 2 args
//Pushes into accounts array
//Set into Storage
(function(username,balance){
  accounts.push({
    username: username,
    balance: balance
  });
  storage.setItemSync('accounts',accounts);
})("Martin",1000);




//Get StorageItem
//var name = storage.getItemSync('name');

console.log(accounts);
