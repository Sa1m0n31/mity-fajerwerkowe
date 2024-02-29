import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('playlists')
export class PlaylistsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    recipient_name: string;

    @Column()
    primary_unique_link: string;

    @Column()
    generated_unique_link: string;

    @Column()
    arguments_array: string;

    @Column()
    with_text: boolean;

    @Column()
    update_token: string;
}
