const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class firstMigration1670955154606 {
    name = 'firstMigration1670955154606'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`delivery_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`saleOrderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`name\` varchar(40) NOT NULL, \`lastName\` varchar(40) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`saleOrderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`saleOrderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL DEFAULT 'user', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`logger\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`massage\` varchar(255) NOT NULL DEFAULT '', \`headers\` varchar(2000) NOT NULL DEFAULT '', \`body\` varchar(2000) NOT NULL DEFAULT '', \`url\` varchar(2000) NOT NULL DEFAULT '', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`authentication\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`saleOrderId\` int NULL, \`loggerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`description\` varchar(20) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`purchase_order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`exchangeRate\` int NOT NULL, \`transactionDate\` varchar(255) NOT NULL, \`receptionDate\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`purchase_order_detail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`shippingCost\` int NOT NULL, \`purchaseOrderId\` int NULL, \`productId\` int NULL, UNIQUE INDEX \`REL_d3dc106ebea0664e37d78d730d\` (\`productId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_stock\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`stock\` int NOT NULL DEFAULT '0', \`productId\` int NULL, UNIQUE INDEX \`REL_6d782c52c11043659e1182b33d\` (\`productId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`description\` varchar(200) NOT NULL, \`assin\` varchar(12) NOT NULL, \`link\` varchar(2000) NULL, \`weight\` int NOT NULL, \`dimensions\` varchar(100) NOT NULL, \`cost\` int NOT NULL, \`storePrice\` int NOT NULL, \`officePrice\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`brandId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale_order_detail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`quantity\` int NOT NULL, \`cost\` int NOT NULL, \`price\` int NOT NULL, \`exchangeRate\` int NOT NULL, \`saleOrderId\` int NULL, \`productId\` int NULL, UNIQUE INDEX \`REL_27d54dc53af2ad26fcd51007b2\` (\`productId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale_order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`deliveryCharged\` int NOT NULL, \`receipNumber\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`advertising_source\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removeAt\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`saleOrderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles\` (\`authenticationId\` int NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_cf0eb261f2cdc17c0b76835a39\` (\`authenticationId\`), INDEX \`IDX_4fb14631257670efa14b15a3d8\` (\`roleId\`), PRIMARY KEY (\`authenticationId\`, \`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`delivery_type\` ADD CONSTRAINT \`FK_1ebb0ff727d3ebbc7fd6046c941\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_5fd785ba25d1ff383fe337870b2\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment_type\` ADD CONSTRAINT \`FK_c725db177eadec10a38c2dc7aa3\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`logger\` ADD CONSTRAINT \`FK_362ae0bb6457f832bf9f6e353a1\` FOREIGN KEY (\`userId\`) REFERENCES \`authentication\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`authentication\` ADD CONSTRAINT \`FK_403747d1ab458c81bac74f78c8e\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`authentication\` ADD CONSTRAINT \`FK_fbbd2edb32c9f118a44d217e90d\` FOREIGN KEY (\`loggerId\`) REFERENCES \`logger\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` ADD CONSTRAINT \`FK_8da67d8be88e9d95b40f0f0931b\` FOREIGN KEY (\`purchaseOrderId\`) REFERENCES \`purchase_order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` ADD CONSTRAINT \`FK_d3dc106ebea0664e37d78d730d3\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_stock\` ADD CONSTRAINT \`FK_6d782c52c11043659e1182b33db\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_bb7d3d9dc1fae40293795ae39d6\` FOREIGN KEY (\`brandId\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` ADD CONSTRAINT \`FK_d37fc914fbf80e299a65e0ac431\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order_detail\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` ADD CONSTRAINT \`FK_27d54dc53af2ad26fcd51007b29\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`advertising_source\` ADD CONSTRAINT \`FK_4318f782b4ce5b706bc93839ab7\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_cf0eb261f2cdc17c0b76835a395\` FOREIGN KEY (\`authenticationId\`) REFERENCES \`authentication\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_4fb14631257670efa14b15a3d86\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_4fb14631257670efa14b15a3d86\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_cf0eb261f2cdc17c0b76835a395\``);
        await queryRunner.query(`ALTER TABLE \`advertising_source\` DROP FOREIGN KEY \`FK_4318f782b4ce5b706bc93839ab7\``);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` DROP FOREIGN KEY \`FK_27d54dc53af2ad26fcd51007b29\``);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` DROP FOREIGN KEY \`FK_d37fc914fbf80e299a65e0ac431\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_bb7d3d9dc1fae40293795ae39d6\``);
        await queryRunner.query(`ALTER TABLE \`product_stock\` DROP FOREIGN KEY \`FK_6d782c52c11043659e1182b33db\``);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` DROP FOREIGN KEY \`FK_d3dc106ebea0664e37d78d730d3\``);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` DROP FOREIGN KEY \`FK_8da67d8be88e9d95b40f0f0931b\``);
        await queryRunner.query(`ALTER TABLE \`authentication\` DROP FOREIGN KEY \`FK_fbbd2edb32c9f118a44d217e90d\``);
        await queryRunner.query(`ALTER TABLE \`authentication\` DROP FOREIGN KEY \`FK_403747d1ab458c81bac74f78c8e\``);
        await queryRunner.query(`ALTER TABLE \`logger\` DROP FOREIGN KEY \`FK_362ae0bb6457f832bf9f6e353a1\``);
        await queryRunner.query(`ALTER TABLE \`payment_type\` DROP FOREIGN KEY \`FK_c725db177eadec10a38c2dc7aa3\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_5fd785ba25d1ff383fe337870b2\``);
        await queryRunner.query(`ALTER TABLE \`delivery_type\` DROP FOREIGN KEY \`FK_1ebb0ff727d3ebbc7fd6046c941\``);
        await queryRunner.query(`DROP INDEX \`IDX_4fb14631257670efa14b15a3d8\` ON \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_cf0eb261f2cdc17c0b76835a39\` ON \`users_roles\``);
        await queryRunner.query(`DROP TABLE \`users_roles\``);
        await queryRunner.query(`DROP TABLE \`advertising_source\``);
        await queryRunner.query(`DROP TABLE \`sale_order\``);
        await queryRunner.query(`DROP INDEX \`REL_27d54dc53af2ad26fcd51007b2\` ON \`sale_order_detail\``);
        await queryRunner.query(`DROP TABLE \`sale_order_detail\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP INDEX \`REL_6d782c52c11043659e1182b33d\` ON \`product_stock\``);
        await queryRunner.query(`DROP TABLE \`product_stock\``);
        await queryRunner.query(`DROP INDEX \`REL_d3dc106ebea0664e37d78d730d\` ON \`purchase_order_detail\``);
        await queryRunner.query(`DROP TABLE \`purchase_order_detail\``);
        await queryRunner.query(`DROP TABLE \`purchase_order\``);
        await queryRunner.query(`DROP TABLE \`brand\``);
        await queryRunner.query(`DROP TABLE \`authentication\``);
        await queryRunner.query(`DROP TABLE \`logger\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`payment_type\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP TABLE \`delivery_type\``);
    }
}
