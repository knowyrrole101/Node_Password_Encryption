var argv = require('yargs').argv;
//array that stores value in _[0]
var command = argv._[0];

console.log(argv);
if(command ==='hello' && typeof argv.lastname !=='undefined' && typeof argv.name !=='undefined'){
  console.log("Hello "+ argv.name +" " + argv.lastname +" !!!");
} else if(command ==='hello'&& typeof argv.name !== 'undefined'){
  console.log("Hello " +argv.name+ " !!!");
} else if (command ==='hello'){
  console.log("hello world!");
}
