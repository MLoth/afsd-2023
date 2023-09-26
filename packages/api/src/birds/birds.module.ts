import { Module } from '@nestjs/common';
import { BirdsService } from './birds.service';
import { BirdsResolver } from './birds.resolver';

@Module({
  providers: [BirdsResolver, BirdsService]
})
export class BirdsModule {}
