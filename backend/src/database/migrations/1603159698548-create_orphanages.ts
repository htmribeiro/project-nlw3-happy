import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1603159698548 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true, // essa coluna sempre será um número positivo
          isPrimary: true, // indica que essa é a minha coluna PK
          isGenerated: true, // essa coluna será gerada automaticamente
          generationStrategy: 'increment', // defino a lógica incremental da coluna 'isGenererated' como auto-incremental
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'instructions',
          type: 'text',
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false,
        }
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }

}
