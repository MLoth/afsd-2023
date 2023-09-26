import { Injectable } from '@nestjs/common'
import { BirdsService } from 'src/birds/birds.service'

import * as birds from './data/birds.json' // set  "resolveJsonModule": true in tsconfig.json
import { Bird } from 'src/birds/entities/bird.entity'

@Injectable()
export class SeedService {
  constructor(private birdsService: BirdsService) {}

  async addBirdsFromJson(): Promise<Bird[]> {
    let theBirds: Bird[] = []
    for (let bird of birds) {
      const b = new Bird()
      b.name = bird.name
      b.fullname = bird.fullname
      b.category = bird.category
      //   b.observations = 0
      //   b.url = bird.url
      //   b.description = bird.description

      theBirds.push(b)
    }

    return this.birdsService.saveAll(theBirds)
  }

  async deleteAllBirds(): Promise<void> {
    return this.birdsService.truncate()
  }
}
