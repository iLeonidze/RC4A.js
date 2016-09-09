(function(exports){
    function arc4(string, key){
    var s = [], j = 0, x, res = '';
    for (var i = 0; i < 256; i++) {
        s[i] = i;
    }
    for (i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < string.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(string.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
}
    function randomString(size){
        var text = "";
        for( var i=0; i < size; i++) text += String.fromCharCode(Math.floor(Math.random()*95+32));
        return text;
    }
    function encrypt(string,key,salt/*optional*/){
        if(typeof salt !== "string" || !salt || salt==null || salt=="" || salt.length>9999){
            var saltSize = 16;
            if(string.length>64) saltSize = 32;
            if(string.length>256) saltSize = 64;
            if(string.length>1024) saltSize = 128;
            salt = randomString(saltSize);
        }
        var preEncodedString = "";
        if(salt.length<1000) preEncodedString += "0";
        if(salt.length<100) preEncodedString += "0";
        if(salt.length<10) preEncodedString += "0";
        preEncodedString += Number(salt.length).toString();
        preEncodedString += salt;
        preEncodedString += arc4(string,salt);
        return arc4(preEncodedString,key);
    }
    function decrypt(string,key){
        var preEncodedString = arc4(string,key);
        var saltSize = parseInt(preEncodedString.substr(0,4));
        var salt = preEncodedString.substr(4,saltSize);
        return arc4(preEncodedString.substr(4+saltSize),salt);
    }
    module.exports = {
        arc4:arc4,
        encrypt:encrypt,
        decrypt:decrypt
    };
})(typeof exports === 'undefined' ? this['rc4a']={} : exports);