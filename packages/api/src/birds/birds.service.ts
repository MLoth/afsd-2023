import { Injectable } from '@nestjs/common'
import { CreateBirdInput } from './dto/create-bird.input'
import { Bird } from './entities/bird.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class BirdsService {
  constructor(
    @InjectRepository(Bird)
    private readonly birdRepository: MongoRepository<Bird>,
  ) {}

  findAll(): Promise<Bird[]> {
    return this.birdRepository.find()
  }

  findOneById(id: string): Promise<Bird> {
    const obj = new ObjectId(id)
    console.log(obj)
    // @ts-ignore
    return this.birdRepository.findOne({ _id: new ObjectId(id) })
  }

  findOneByName(name: string): Promise<Bird> {
    return this.birdRepository.findOne({ where: { name } })
  }

  findBirdsByCategory(category: string): Promise<Bird[]> {
    return this.birdRepository.find({ where: { category } })
  }

  findBirdsBySearchString(searchString: string): Promise<Bird[]> {
    return this.birdRepository.find({
      name: { $regex: searchString, $options: 'i' },
    })
  }

  create(createBirdInput: CreateBirdInput): Promise<Bird> {
    const b = new Bird()
    b.name = createBirdInput.name
    b.fullname = createBirdInput.fullname
    b.category = createBirdInput.category
    b.url = createBirdInput.url
    b.observations = createBirdInput.observations
    b.description = createBirdInput.description

    return this.birdRepository.save(b)
  }

  async incrementObservationsCount(birdId: string): Promise<void> {
    const bird = await this.findOneById(birdId)
    this.birdRepository.update(
      { id: birdId },
      { observations: bird.observations + 1 },
    )
  }

  // Function for seeding
  saveAll(birds: Bird[]): Promise<Bird[]> {
    return this.birdRepository.save(birds)
  }

  truncate(): Promise<void> {
    return this.birdRepository.clear()
  }
}
