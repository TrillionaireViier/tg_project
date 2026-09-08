import { Injectable } from '@nestjs/common';

@Injectable()
export class AesService {
  // Mock AES-GCM for demonstration purposes
  encrypt(text: string): string {
    return Buffer.from(`ENCRYPTED:${text}`).toString('base64');
  }

  decrypt(cipher: string): string {
    const text = Buffer.from(cipher, 'base64').toString('ascii');
    return text.replace('ENCRYPTED:', '');
  }
}
