import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Role, User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(uid: string, createUserInput: CreateUserInput) {
    const user = new User()
    user.uid = uid
    user.locale = createUserInput.locale ?? 'nl'
    user.role = Role.USER // BUG: default columns doenst seem to work.
    return this.userRepository.save(user)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: string) {
    return new Error(`This action returns a #${id} user`)
  }

  findOneByUid(uid: string) {
    return this.userRepository.findOneByOrFail({ uid })
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return new Error(`This action updates a #${id} user`)
  }

  remove(id: string) {
    return new Error(`This action removes a #${id} user`)
  }
}
