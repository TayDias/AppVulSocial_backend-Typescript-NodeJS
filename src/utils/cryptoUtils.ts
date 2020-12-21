import * as Crypto from 'crypto'

export function dec(cipherText: any){
   var dc = Crypto.createDecipheriv("aes-128-ecb", convertCryptKey((process.env.ENCRYPTION_KEY+'')), "");
   var decrypted = dc.update(cipherText, 'hex', 'utf8') + dc.final('utf8');
    
   return decrypted;
 }

 export function enc(text: string){
   var c = Crypto.createCipheriv("aes-128-ecb", convertCryptKey((process.env.ENCRYPTION_KEY+'')), "");
   var crypted = c.update(text, 'utf8', 'hex') + c.final('hex');

   return crypted;
 }

 export function decPass(cipherText: any){
   var dc = Crypto.createDecipheriv("aes-128-ecb", convertCryptKey((process.env.PASSWORDS_ENCRYPTION_KEY+'')), "");
   var decrypted = dc.update(cipherText, 'hex', 'utf8') + dc.final('utf8');
    
   return decrypted;
 }

 export function encPass(password: string){
   var c = Crypto.createCipheriv("aes-128-ecb", convertCryptKey((process.env.PASSWORDS_ENCRYPTION_KEY+'')), "");
   var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');

   return crypted;
 }

 function convertCryptKey(strKey: any) {
   var newKey = new Buffer([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
   strKey = new Buffer(strKey);
   for(var i=0;i<strKey.length;i++) newKey[i%16]^=strKey[i];
   return newKey;
}