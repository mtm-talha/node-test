import { MoreThan, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import App from "../../app";


export class EventsService {
  private eventRepository: Repository<Event>;

  constructor(app: App) {
    this.eventRepository = app.getDataSource().getRepository(Event);
  }

  async getWarmupEvents() {
    return await this.eventRepository.find();
  }
  async getEventsWithWorkshops() {
    return await this.eventRepository.find({ relations: ["workshops"] });
  }

  async getFutureEventWithWorkshops() {
    return await this.eventRepository.find({ 
      relations: ["workshops"], 
      where: {
        workshops: {
          start:  MoreThan(new Date().toISOString())
        }
      } 
    });
  }

  
}
