# RC4A.js v0.1.2
NodeJS/JavaScript implementation of simple and powerfull string encryption/decryption with the password & UTF-8 support.
You can encrypt string in the browser and decrypt it on the [PHP-server](https://github.com/iLeonidze/RC4A.php). Or encrypt on the [PHP-server](https://github.com/iLeonidze/RC4A.php) and decrypt in browser.

###[Go to RC4A for PHP on GitHub](https://github.com/iLeonidze/RC4A.php)

No dependecies! No OpenSSL required. Javascript, NodeJS, PHP compatible.

## How to use in project
JavaScript:
```html
<script src="rc4a.min.js" type="text/javascript"></script>
```
NodeJS:
```js
var rc4a = require("rc4a");
```

## Encryption
```js
var text = "Lorem ipsum 123 ёюйяъэ !№;%:?*()";
var password = "supёrP@$$w0rd";
var secret = rc4a.encrypt(text,password);
console.log(secret); // Will output something like this: ]êòd»÷[c #hümZºí¤xì/S-ѲѩҴӷдӂp±⅁ÑD_»¼ú{
```

## Decryption
```js
var decryptedText = rc4a.decrypt(secret,password);
console.log(decryptedText); // Will output: Lorem ipsum 123 ёюйяъэ !№;%:?*()
```

## Encryption with the custom salt
RC4A.js automatically generate random salt via Math.random(). Salt size is dynamic - from 16 up to 128. If you do not trust, you can use your own salt up to 9999-size length. Just specify it: 
```js
var customSalt = "397ba6e0085f182db7ee7f6e3515530d";
var secret = rc4a.encrypt(text,password,customSalt);
```
And that's it. You don't have to pass salt for the decryption.

## Error catching
Do not forget about damaged data. Test your code like this:
```js
var text = "Lorem ipsum 123 ёюйяъэ !№;%:?*()";
var password = "supёrP@$$w0rd";
var secret = rc4a.encrypt(text,password).substr(4); // let's damage this encrypted content
try{
  var decryptedText = rc4a.decrypt(secret,password); // here you will get an error
  console.log("Successfully decrypted! Decrypted text:",decryptedText);
}catch(e){
  console.log("Can\'t decrypt your data.");
}
```

## TODO:
- Beatiful Threw Error
- Add streams
