import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Page } from "./page";
import { URL } from "url";
import { Measurement } from "./measurement";
import { Comment } from "./comment";

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pageId: number;

  @Column()
  title: string;

  @Column()
  uri: string;

  @Column()
  thumbnail: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(type => Page, page => page.vidoes)
  page: Page;

  @OneToOne(type => Measurement, measurement => measurement.video, {
    eager: true
  })
  measurement: Measurement;

  @OneToMany(type => Comment, comment => comment.videoId)
  comments: Comment[];
}
