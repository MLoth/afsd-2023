import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateLivelocationInput } from './dto/create-livelocation.input'
import { Livelocation } from './entities/livelocation.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class LivelocationsService {
  constructor(
    @InjectRepository(Livelocation)
    private readonly locationRepository: Repository<Livelocation>,
    private readonly userService: UsersService,
  ) {}

  async create(createLivelocationInput: CreateLivelocationInput) {
    console.log('Aanmaken live location')

    if (!(await this.userService.findOne(createLivelocationInput.idUser))) {
      throw new Error('User not found, check your idUser')
    }

    const location = new Livelocation()
    location.idUser = createLivelocationInput.idUser
    location.geolocation = createLivelocationInput.geolocation
    return this.locationRepository.save(location)
  }

  findLastByUserID(idUser: string) {
    return this.locationRepository.findOne({
      order: { createdAt: 'DESC' },
      where: { idUser },
    })
  }
}
