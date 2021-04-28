import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMetabolicHello(): string {
    return 'Metabolic Rocks! Please visit http://localhost/graphql';
  }
}
