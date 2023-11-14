import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LivelocationsService } from './livelocations.service'
import { LivelocationsResolver } from './livelocations.resolver'
import { Livelocation } from './entities/livelocation.entity'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Livelocation]), UsersModule],
  providers: [LivelocationsResolver, LivelocationsService],
  exports: [LivelocationsService],
})
export class LivelocationsModule {}
