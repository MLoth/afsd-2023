import { Injectable } from '@nestjs/common';
import { CreateBirdInput } from './dto/create-bird.input';
import { UpdateBirdInput } from './dto/update-bird.input';

@Injectable()
export class BirdsService {
  create(createBirdInput: CreateBirdInput) {
    return 'This action adds a new bird';
  }

  findAll() {
    return `This action returns all birds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bird`;
  }

  update(id: number, updateBirdInput: UpdateBirdInput) {
    return `This action updates a #${id} bird`;
  }

  remove(id: number) {
    return `This action removes a #${id} bird`;
  }
}
