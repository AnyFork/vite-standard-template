import CryptoJS from 'crypto-js'
// 加密秘钥
const CryptoSecret = 'anyfork-admin-naive'

/**
 * 加密数据
 * @param data - 数据
 */
export function encrypto(data: any): string {
    const newData = JSON.stringify(data)
    return CryptoJS.AES.encrypt(newData, CryptoSecret).toString()
}

/**
 * 解密数据
 * @param cipherText - 密文
 */
export function decrypto(cipherText: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherText, CryptoSecret)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(originalText)
}
