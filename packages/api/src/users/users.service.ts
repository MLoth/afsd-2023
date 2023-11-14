import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Role, User } from './entities/user.entity'
import { MongoRepository } from 'typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
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
    return this.userRepository.findOneBy({ _id: new ObjectId(id) })
  }

  findOneByUid(uid: string) {
    return this.userRepository.findOneByOrFail({ uid })
  }

  async update(uid: string, updateUserInput: UpdateUserInput) {
    const currentUser = await this.findOneByUid(uid)

    const updateUser = new User()
    updateUser.id = currentUser.id
    updateUser.uid = uid
    updateUser.role = currentUser.role
    updateUser.locale = updateUserInput.locale ?? currentUser.locale
    updateUser.createdAt = currentUser.createdAt
    updateUser.updatedAt = new Date()
    return this.userRepository.save(updateUser)
  }

  remove(id: string) {
    return new Error(`This action removes a #${id} user`)
  }
}
