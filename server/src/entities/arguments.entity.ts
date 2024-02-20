import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('arguments')
export class ArgumentsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    miniature_title: string;

    @Column()
    miniature_img: string;

    @Column()
    group_name: string;

    @Column()
    flag: string;

    @Column()
    counterargument_yt_link: string;

    @Column()
    counterargument_variants: string;
}
