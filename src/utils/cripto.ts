import CryptoJS from 'crypto-js'
import dotenv from "dotenv";

dotenv.config()

const SECRET = process.env.PORT || ""

class Encryption {

    enc(plainText: string) {
        var b64 = CryptoJS.AES.encrypt(plainText, SECRET).toString();
        var e64 = CryptoJS.enc.Base64.parse(b64);
        var eHex = e64.toString(CryptoJS.enc.Hex);
        return eHex;
    };

    dec(cipherText: string) {
        var reb64 = CryptoJS.enc.Hex.parse(cipherText);
        var bytes = reb64.toString(CryptoJS.enc.Base64);
        var decrypt = CryptoJS.AES.decrypt(bytes, SECRET);
        var plain = decrypt.toString(CryptoJS.enc.Utf8);
        return plain;
    };

}

export default Encryption;