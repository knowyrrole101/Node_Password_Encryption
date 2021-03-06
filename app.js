console.log("Starting Password Manager");
var crypto = require('crypto-js');
var storage = require('node-persist');
//<------------------------->//
var argv = require('yargs')
  //Create Account Command
  .command('create', 'Create new account', function(yargs){
    yargs.options({
      account_name: {
        demand: true,
        alias: 'a',
        description: 'Account Name',
        type: 'string'
      },
      username: {
        demand: true,
        alias: 'u',
        description: 'Username',
        string: 'string'
      },
      password: {
        demand:true,
        alias: 'p',
        description: 'Password',
        string: 'string',
      },
      master_password: {
        demand: true,
        alias: 'm',
        description: 'Master Password',
        string: 'string'
      }
    }).help('help');
  })
  //Get Account Command
  .command('get', 'Get account', function(yargs){
    yargs.options({
      account_name: {
        demand: true,
        alias: 'a',
        description: 'Account Name',
        string: 'string'
      },
      master_password: {
        demand: true,
        alias: 'm',
        description: 'Master Password',
        string: 'string'
      }
    }).help('help');
  })
  .help('help')
  .argv;
//<---------------------------->//
//Argument Command store
var command = argv._[0];
//Argv data
var data = argv;
//Initialize Storage Sync
//from node persist
storage.initSync();
//<------------------------------>//
//<--Function Pulls Encoded Records, Decrypts and returns-->
function get_accounts(master_password){
  //Pull from Persist
  var encrypted_accounts = storage.getItemSync('accounts');
  var accounts=[];
  //Decrypt using master_password and passing in the encrypted_accounts
  if(typeof encrypted_accounts !== 'undefined'){
    var bytes = crypto.AES.decrypt(encrypted_accounts, master_password);
    //JSON Accounts
    accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
  }
  return accounts;
}
//<--Function Saves Encrypted Records -->
function save_accounts(accounts,master_password){
  //Encrypt JSON Data
  var encrypted_accounts = crypto.AES.encrypt(JSON.stringify(accounts), master_password);
  //Store in persist the encrypted data in accounts
  storage.setItemSync('accounts', encrypted_accounts.toString());
  return accounts;
}

function create_account(account, master_password){
  var accounts = get_accounts(master_password);
  //push object created by create command into accounts hash
  accounts.push(account);
  save_accounts(accounts, master_password);

  return account;
}

function get_account(account_name,master_password){
  var accounts = get_accounts(master_password);
  var matched_account;
  //Loop through JSON object to find account.account_name
  accounts.forEach(function(account){
    if(account.account_name === account_name){
      matched_account = account;
    }
  });
  return matched_account;
}

var execute_account_command = function(){
  if(command==='create'){
    try{
      var created_account = create_account({
        account_name: data.account_name,
        username: data.username,
        password: data.password
      }, data.master_password);
      console.log("Account Created");
      console.log(created_account);
    } catch(e) {
      console.log("Unable to create account");
    };
  }
  else if(command==='get'){
    try{
      var stored_account = get_account(data.account_name,data.master_password);
      console.log("Retrieving Account...");
      console.log(stored_account);
    } catch(e){
      console.log("Unable to retrieve account!");
    };
  }
};

execute_account_command();
