import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Workshop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    start: string;

    @Column({ type: 'datetime' })
    end: string;

    @Column({ type: 'integer', default: null })
    eventId: number;

    @Column()
    name: string;

    @Column({ type: 'datetime' })
    createdAt: string;
    @ManyToOne(type => Event, event => event.id)
    event?: Event;
    // @OneToMany(type => Event, event => event.id)
    // event: Event;
}
