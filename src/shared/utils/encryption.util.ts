import * as CryptoJS from 'crypto-js';

export class EncryptionUtil {
  private static readonly secretKey = process.env.ENCRYPTION_KEY || 'default-secret-key';

  /**
   * Cifra un texto usando AES
   * @param text - Texto a cifrar
   * @returns Texto cifrado
   */
  static encrypt(text: string): string {
    if (!text) return text;
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }

  /**
   * Descifra un texto usando AES
   * @param encryptedText - Texto cifrado
   * @returns Texto descifrado
   */
  static decrypt(encryptedText: string): string {
    if (!encryptedText) return encryptedText;
    try {
      return CryptoJS.AES.decrypt(encryptedText, this.secretKey).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error al descifrar texto:', error);
      return encryptedText;
    }
  }

  /**
   * Cifra un objeto completo
   * @param obj - Objeto a cifrar
   * @param fields - Campos a cifrar
   * @returns Objeto con campos cifrados
   */
  static encryptObject(obj: any, fields: string[]): any {
    const encryptedObj = { ...obj };
    fields.forEach(field => {
      if (encryptedObj[field]) {
        encryptedObj[field] = this.encrypt(encryptedObj[field]);
      }
    });
    return encryptedObj;
  }

  /**
   * Descifra un objeto completo
   * @param obj - Objeto a descifrar
   * @param fields - Campos a descifrar
   * @returns Objeto con campos descifrados
   */
  static decryptObject(obj: any, fields: string[]): any {
    const decryptedObj = { ...obj };
    fields.forEach(field => {
      if (decryptedObj[field]) {
        decryptedObj[field] = this.decrypt(decryptedObj[field]);
      }
    });
    return decryptedObj;
  }
} 