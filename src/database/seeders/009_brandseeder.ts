import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { BrandData } from '../data/009_brand.data';
import { Brand } from '../models/brand.entity';

export default class ProductSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Brand)
      .values(BrandData)
      .execute();
  }
}
