import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { ProductData } from '../data/033_product.data';
import { Product } from '../models/product.entity';

export default class ProductSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(ProductData)
      .execute();
  }
}
