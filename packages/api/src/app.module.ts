import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { BirdsModule } from './birds/birds.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeedModule } from './seed/seed.module'
import { ObservationsModule } from './observations/observations.module'
import { LocationsModule } from './locations/locations.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27031/api',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // Careful with this in production
      useNewUrlParser: true,
      useUnifiedTopology: true, // Disable deprecated warnings
    }),

    BirdsModule,
    SeedModule,
    ObservationsModule,
    LocationsModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
