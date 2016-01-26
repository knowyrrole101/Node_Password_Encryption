console.log("Starting Password Manager");
var storage = require('node-persist');
//Initialize Storage Sync
//from node persist
storage.initSync();

function create_account(account){
  var accounts = storage.getItemSync('accounts');
  if (typeof accounts === 'undefined'){
    accounts = [];
  }
  //push account data to accounts array
  accounts.push(account);
  //Set as local storage
  storage.setItemSync('accounts',accounts)
  //Return this data!
  return account;
};

function get_account(account_name){
  var accounts = storage.getItemSync('accounts');
  var matched_account;
  accounts.forEach(function(account){
    if(account.name === account_name){
      matched_account = account;
    }
  });
  return matched_account;
  //iterate over accounts array return matching account
  //else undefined
};

//create the account...set as an array with date in it
// create_account({
//   name: "Facebook",
//   email: "moonahmed0617@gmail.com",
//   password: "pass1234"
// });

var facebook_account = get_account("Facebook");
console.log(facebook_account);
