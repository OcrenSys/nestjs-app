const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addColumnTrqackingNumber1670955952613 {
    name = 'addColumnTrqackingNumber1670955952613'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`purchase_order\` ADD \`trackingNumber\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`delivery_type\` DROP FOREIGN KEY \`FK_1ebb0ff727d3ebbc7fd6046c941\``);
        await queryRunner.query(`ALTER TABLE \`delivery_type\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`delivery_type\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP FOREIGN KEY \`FK_5fd785ba25d1ff383fe337870b2\``);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_type\` DROP FOREIGN KEY \`FK_c725db177eadec10a38c2dc7aa3\``);
        await queryRunner.query(`ALTER TABLE \`payment_type\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_type\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`logger\` DROP FOREIGN KEY \`FK_362ae0bb6457f832bf9f6e353a1\``);
        await queryRunner.query(`ALTER TABLE \`logger\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`logger\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`authentication\` DROP FOREIGN KEY \`FK_403747d1ab458c81bac74f78c8e\``);
        await queryRunner.query(`ALTER TABLE \`authentication\` DROP FOREIGN KEY \`FK_fbbd2edb32c9f118a44d217e90d\``);
        await queryRunner.query(`ALTER TABLE \`authentication\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`authentication\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`authentication\` CHANGE \`loggerId\` \`loggerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`brand\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_order\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` DROP FOREIGN KEY \`FK_8da67d8be88e9d95b40f0f0931b\``);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` DROP FOREIGN KEY \`FK_d3dc106ebea0664e37d78d730d3\``);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` CHANGE \`purchaseOrderId\` \`purchaseOrderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product_stock\` DROP FOREIGN KEY \`FK_6d782c52c11043659e1182b33db\``);
        await queryRunner.query(`ALTER TABLE \`product_stock\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_stock\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_bb7d3d9dc1fae40293795ae39d6\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`link\` \`link\` varchar(2000) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`brandId\` \`brandId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` DROP FOREIGN KEY \`FK_d37fc914fbf80e299a65e0ac431\``);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` DROP FOREIGN KEY \`FK_27d54dc53af2ad26fcd51007b29\``);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_order\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`advertising_source\` DROP FOREIGN KEY \`FK_4318f782b4ce5b706bc93839ab7\``);
        await queryRunner.query(`ALTER TABLE \`advertising_source\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`advertising_source\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL`);
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
    }

    async down(queryRunner) {
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
        await queryRunner.query(`ALTER TABLE \`advertising_source\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`advertising_source\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`advertising_source\` ADD CONSTRAINT \`FK_4318f782b4ce5b706bc93839ab7\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_order\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` CHANGE \`productId\` \`productId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` ADD CONSTRAINT \`FK_27d54dc53af2ad26fcd51007b29\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_order_detail\` ADD CONSTRAINT \`FK_d37fc914fbf80e299a65e0ac431\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order_detail\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`brandId\` \`brandId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`link\` \`link\` varchar(2000) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_bb7d3d9dc1fae40293795ae39d6\` FOREIGN KEY (\`brandId\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_stock\` CHANGE \`productId\` \`productId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_stock\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_stock\` ADD CONSTRAINT \`FK_6d782c52c11043659e1182b33db\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` CHANGE \`productId\` \`productId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` CHANGE \`purchaseOrderId\` \`purchaseOrderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` ADD CONSTRAINT \`FK_d3dc106ebea0664e37d78d730d3\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order_detail\` ADD CONSTRAINT \`FK_8da67d8be88e9d95b40f0f0931b\` FOREIGN KEY (\`purchaseOrderId\`) REFERENCES \`purchase_order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`brand\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`authentication\` CHANGE \`loggerId\` \`loggerId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`authentication\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`authentication\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`authentication\` ADD CONSTRAINT \`FK_fbbd2edb32c9f118a44d217e90d\` FOREIGN KEY (\`loggerId\`) REFERENCES \`logger\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`authentication\` ADD CONSTRAINT \`FK_403747d1ab458c81bac74f78c8e\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`logger\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`logger\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`logger\` ADD CONSTRAINT \`FK_362ae0bb6457f832bf9f6e353a1\` FOREIGN KEY (\`userId\`) REFERENCES \`authentication\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`payment_type\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`payment_type\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`payment_type\` ADD CONSTRAINT \`FK_c725db177eadec10a38c2dc7aa3\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD CONSTRAINT \`FK_5fd785ba25d1ff383fe337870b2\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`delivery_type\` CHANGE \`saleOrderId\` \`saleOrderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`delivery_type\` CHANGE \`removeAt\` \`removeAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`delivery_type\` ADD CONSTRAINT \`FK_1ebb0ff727d3ebbc7fd6046c941\` FOREIGN KEY (\`saleOrderId\`) REFERENCES \`sale_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_order\` DROP COLUMN \`trackingNumber\``);
    }
}