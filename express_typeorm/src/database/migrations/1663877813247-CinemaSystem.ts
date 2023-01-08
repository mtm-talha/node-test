import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie_show',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'show_room',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'time', type: 'timestamp' },
          { name: 'movie_id', type: 'integer' },
          { name: 'seat_id', type: '' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'seat',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'type', type: 'varchar' },
          { name: 'is_available', type: 'tinyint' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
   
    await queryRunner.createTable(
      new Table({
        name: 'seating_plan',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'type', type: 'varchar' },
          { name: 'price', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'seat_id', type: 'integer' },
          { name: 'show_id', type: 'integer' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['seat_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seat',
        onDelete: 'CASCADE',
      }),
      
    );
    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['show_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'show_room',
        onDelete: 'CASCADE',
      }),
      
    );
    await queryRunner.createForeignKey(
      'show_room',
      new TableForeignKey({
        columnNames: ['seat_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seat',
        onDelete: 'CASCADE',
      }),
      
    );
    // throw new Error('TODO: implement migration in task 4');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
