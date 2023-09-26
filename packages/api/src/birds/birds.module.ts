import { Module } from '@nestjs/common'
import { BirdsService } from './birds.service'
import { BirdsResolver } from './birds.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bird } from './entities/bird.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Bird])],
  providers: [BirdsResolver, BirdsService],

  exports: [BirdsService],
})
export class BirdsModule {}
