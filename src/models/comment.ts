import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { Video } from './video';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  videoId: number;

  @Column()
  userId: number;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(type => User, user => user.comments, {
    eager: true
  })
  user: User;

  @ManyToOne(type => Video, video => video.comments)
  video: Video;
}
