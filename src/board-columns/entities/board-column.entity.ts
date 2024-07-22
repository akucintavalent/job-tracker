import { JobApplication } from '../../job-applications/entities/job-application.entity';
import { Board } from '../../boards/entities/board.entity';
import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';

// TODO: (TECH DEBT) UN_ORDER_PER_BOARD should be restored.
// Currently BoardColumnsService.rearangeColumns() uses upsert() to update entities,
// but due to UN_ORDER_PER_BOARD, upsert() gets 'duplicate key value violates unique constraint'
@Entity('board_columns')
@Unique('UN_NAME_PER_BOARD', ['board', 'name'])
//@Unique('UN_ORDER_PER_BOARD', ['board', 'order'])
export class BoardColumn extends BaseEntity {
  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @OneToMany(() => JobApplication, (job) => job.column)
  jobApplications: JobApplication[];
}
