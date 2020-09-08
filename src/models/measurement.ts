import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { Video } from "./video";

@Entity()
export class Measurement {
  @PrimaryColumn()
  videoId: number;

  @Column({default: 0})
  views: number;

  @Column({default: 0})
  thumbsUp: number;

  @Column({default: 0})
  thumbsDown: number;

  @OneToOne(type => Video, video => video.measurement)
  @JoinColumn()
  video: Video;
}
