import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { Base } from './base';

@Entity()
export class Page extends Base {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    path: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
