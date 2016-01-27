var crypto = require('crypto-js');

//JSON - Object
var secret_message = {
  name: "Moon",
  secret_name: "007"
}

var secret_message = JSON.stringify(secret_message);
var secret_key = 'chunks101'

//encrypt
var encrypted_message = crypto.AES.encrypt(secret_message,secret_key);
console.log(secret_message);
console.log("Encrypted Message: "+ encrypted_message);

//decrypt
var bytes = crypto.AES.decrypt(encrypted_message,secret_key);
var decrypted_message = bytes.toString(crypto.enc.Utf8);

//CAN Wrap JSON.parse on bytes.toString
//var decrypted = JSON.parse(bytes.toString(crypto.enc.Utf8));
console.log("Bytes:"+ bytes);
console.log("Decrypted Message:"+ decrypted_message);

//Decrypted JSON returned
var final_decrypt = JSON.parse(decrypted_message);
console.log(final_decrypt);
console.log(typeof final_decrypt);
