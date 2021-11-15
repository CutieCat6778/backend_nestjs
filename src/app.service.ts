import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World!`;
  }
  getHelloUser(name: string): string {
    return name ? `Hello ${name}!` : this.getHello();
  }
}
