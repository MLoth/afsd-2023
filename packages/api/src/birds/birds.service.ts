import { Injectable } from '@nestjs/common'
import { CreateBirdInput } from './dto/create-bird.input'
import { UpdateBirdInput } from './dto/update-bird.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Bird } from './entities/bird.entity'

@Injectable()
export class BirdsService {
  constructor(
    @InjectRepository(Bird)
    private readonly birdRepository: Repository<Bird>,
  ) {}

  create(createBirdInput: CreateBirdInput) {
    const b = new Bird()
    b.name = createBirdInput.name
    b.fullname = createBirdInput.fullname
    b.category = createBirdInput.category
    // b.url = createBirdInput.url
    // b.observations = createBirdInput.observations
    // b.description = createBirdInput.description

    return this.birdRepository.save(b)
  }

  findAll() {
    return this.birdRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} bird`
  }

  update(id: number, updateBirdInput: UpdateBirdInput) {
    return `This action updates a #${id} bird`
  }

  remove(id: number) {
    return `This action removes a #${id} bird`
  }

  //logica for seeding

  saveAll(birds: Bird[]) {
    return this.birdRepository.save(birds)
  }

  truncate() {
    return this.birdRepository.clear()
  }
}
