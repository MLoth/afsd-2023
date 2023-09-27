import { Module } from '@nestjs/common'
import { BirdsModule } from 'src/birds/birds.module'
import { CommandModule } from 'nestjs-command'
import { SeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'
@Module({
  imports: [BirdsModule, CommandModule],
  providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
