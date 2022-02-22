import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddCustomerIdToOrders1645572819958 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'orders',
			new TableColumn({
				name: 'customer_id',
				type: 'uuid',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'orders',
			new TableForeignKey({
				name: 'ordersCustomer',
				columnNames: ['customer_id'],
				referencedTableName: 'customers',
				referencedColumnNames: ['id'],
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('orders', 'ordersCustomers');
		await queryRunner.dropColumn('orders', 'customer_id');
	}
}
