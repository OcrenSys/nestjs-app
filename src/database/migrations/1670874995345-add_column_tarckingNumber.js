const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addColumnTarckingNumber1670874995345 {
    name = 'addColumnTarckingNumber1670874995345'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`purchase_order\` ADD \`trackingNumber\` int NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`purchase_order\` DROP COLUMN \`trackingNumber\``);
    }
}
