import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { BirdsService } from 'src/birds/birds.service'
import { birdStub } from 'src/birds/stubs/birds.stub'
import { ObservationsService } from 'src/observations/observations.service'
import { observationStub } from 'src/observations/stubs/observations.stub'
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard'
import { FirebaseAuthStrategy } from 'src/authentication/firebase.strategy'
import { auth } from 'firebase-admin'
import { FirebaseAuthStrategyMock } from './firebase.strategy.mock'
import { UsersService } from 'src/users/users.service'
import { Role, User } from 'src/users/entities/user.entity'

const GQL_ENDPOINT = '/graphql'
const dummyJwtToken =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBkMGU4NmJkNjQ3NDBjYWQyNDc1NjI4ZGEyZWM0OTZkZjUyYWRiNWQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Fkdi1mdWxsLXN0YWNrLTIwMjItdGVzdCIsImF1ZCI6ImFkdi1mdWxsLXN0YWNrLTIwMjItdGVzdCIsImF1dGhfdGltZSI6MTY5NzM4OTcxOSwidXNlcl9pZCI6IjBQSVQ4RVVldVVadmJreGV6NEhWd0tzNUdWazEiLCJzdWIiOiIwUElUOEVVZXVVWnZia3hlejRIVndLczVHVmsxIiwiaWF0IjoxNjk4OTIyMTIwLCJleHAiOjE2OTg5MjU3MjAsImVtYWlsIjoic2RxZnFkc2ZxZHNmZHNkc2ZxcWZnQGRkZC5kZCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzZHFmcWRzZnFkc2Zkc2RzZnFxZmdAZGRkLmRkIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.aTZu66nOt8Sx9JeCbN_Q2cI2AnffvPok4dbcYJm8Gad0Xfz-DpUAw524i7LGpXbOraftd5PlkUjeMmD1fYpstezUdsnckoHmAmh_NaLZQ3OZ5HhjYfdtd-tsKRCnxQuWqd_QC5xo9rT8rpBb2WatXhaMZVbDgB7QbPUUJy4dLSQwAr73paAVJ3eave9R4-8c8q4FU7HXB6_Qeih5Ie-i54xEWoA-da3gHs0A_rWWwDOSgnh4pqMEWWMbe5PZQ0szjOykTS0nDafcL4_R0NdEeUYIR7RXBxy0LOO8WP8k5DF0oZlbtZBQc1UFiVKlquuSv2xZzsHQ-VALID-A'
const dummyInvalidJwtToken =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBkMGU4NmJkNjQ3NDBjYWQyNDc1NjI4ZGEyZWM0OTZkZjUyYWRiNWQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Fkdi1mdWxsLXN0YWNrLTIwMjItdGVzdCIsImF1ZCI6ImFkdi1mdWxsLXN0YWNrLTIwMjItdGVzdCIsImF1dGhfdGltZSI6MTY5NzM4OTcxOSwidXNlcl9pZCI6IjBQSVQ4RVVldVVaINVALID6NEhWd0tzNUdWazEiLCJzdWIiOiIwUElUOEVVZXVVWnZia3hlejRIVndLczVHVmsxIiwiaWF0IjoxNjk4OTIyMTIwLCJleHAiOjE2OTg5MjU3MjAsImVtYWlsIjoic2RxZnFkc2ZxZHNmZHNkc2ZxcWZnQGRkZC5kZCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzZHFmcWRzZnFkc2Zkc2RzZnFxZmdAZGRkLmRkIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.aTtu66nOt8Sx9JeCbN_Q2cI2AnffvPok4dbcYJm8Gad0Xfz-DpUAw524i7LGpXbOraftd5PlkUjeMmD1fYpstezUdsnckoHmAmh_NaLZQ3OZ5HhjYfdtd-tsKRCnxQuWqd_QC5xo9rT8rpBb2WatXhaMZVbDgB7QbPUUJy4dLSQwAr73paAVJ3eave9R4-8c8q4FU7HXB6_Qeih5Ie-i54xEWoA-da3gHs0A_rWWwDOSgnh4pqMEWWMbe5PZQ0szjOykTS0nDafcL4_R0NdEeUYIR7RXBxy0LOO8WP8k5DF0oZlbtZBQc1UFiVKlquuSv2xZzsHQ-INVALID-A'
describe('AppController (e2e)', () => {
  let app: INestApplication

  let birdsServiceMockData = {
    findAll: () => [birdStub()],
    findOneById: () => birdStub(),
  }

  let observationServiceMockData = {
    findAll: () => [
      // {
      //   id: '652e5994812989da79ecd327',
      //   userUid: '652c1c9cf2dc02e7bb903c5e',
      //   birdId: '652e5989204b1d8ef65ed992',
      //   locationId: '652e5994812989da79ecd326',
      //   description: 'Example description',
      //   geolocation: {
      //     type: 'Point',
      //     coordinates: [1, 1],
      //   },
      // },
      observationStub(),
    ],
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BirdsService)
      .useValue(birdsServiceMockData)
      .overrideProvider(ObservationsService)
      .useValue(observationServiceMockData)
      .overrideProvider(FirebaseAuthStrategy)
      .useClass(FirebaseAuthStrategyMock)
      .overrideProvider(UsersService)
      .useValue({
        findAll: () => [
          {
            id: '652c1c9cf2dc02e7bb903c5e',
            uid: '0PIT8EUeuUZvbkxez4HVwKs5GVk1',
            locale: 'nl',
            role: 'USER',
            createdAt: '2023-10-15T17:08:44.542Z',
            updatedAt: '2023-10-15T17:08:44.542Z',
          },
          {
            id: '652c1c9cf2dc02e7bb903c5e',
            uid: 'H4lI64EpZnZTh47tgaTtV8WDubJ2',
            locale: 'nl',
            role: 'ADMIN',
            createdAt: '2023-10-15T17:08:44.542Z',
            updatedAt: '2023-10-15T17:08:44.542Z',
          },
        ],
        findOneByUid: jest.fn(), // we will mock this in the test, so we can return a user with role USER or ADMIN
      })
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })

  describe(GQL_ENDPOINT, () => {
    describe('Birds', () => {
      it('should return all birds', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: '{ birds { id, name } }',
          })
          .expect(200)
          .expect(res => {
            expect(res.body.data.birds).toEqual([
              { id: '652e5989204b1d8ef65ed992', name: 'Example' },
            ])
          })
      })
    })
    describe('Observations', () => {
      it('all observations should give Unauthorized when no bearer token', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: '{ observations { id } }',
          })
          .expect(200)
          .expect(res => {
            expect(res.body.errors[0].message).toEqual('Unauthorized')
          })
      })

      it('all observations should give Unauthorized when invalid bearer token', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: '{ observations { id } }',
          })
          .set('Authorization', `Bearer ${dummyInvalidJwtToken}}`)
          .expect(200)
          .expect(res => {
            expect(res.body.errors[0].message).toEqual('Unauthorized')
          })
      })

      it('should return all observations with valid bearer token', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: '{ observations { id , bird {id,name} } }',
          })
          .set('Authorization', `Bearer ${dummyJwtToken}`)
          .expect(200)
          .expect(res => {
            expect(res.body.data.observations).toEqual([
              {
                id: '652e5994812989da79ecd327',
                bird: { id: '652e5989204b1d8ef65ed992', name: 'Example' },
              },
            ])
          })
      })
    })
    describe('Users', () => {
      it('give Unauthorized when invalid bearer token', () => {
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: '{ users { id } }',
          })
          .set('Authorization', `Bearer ${dummyInvalidJwtToken}}`)
          .expect(200)
          .expect(res => {
            expect(res.body.errors[0].message).toEqual('Unauthorized')
          })
      })

      it('should return all users with valid bearer token, but role USER', () => {
        const usersService = app.get(UsersService)
        jest
          .spyOn(usersService, 'findOneByUid')
          .mockImplementation((uid: string): Promise<User> => {
            const user: User = {
              id: '0PIT8EUeuUZvbkxez4HVwKs5GVk1',
              role: Role.USER, // <--- USER
              uid: uid,
            }
            return Promise.resolve(user)
          })
        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: '{ users { id } }',
          })
          .set('Authorization', `Bearer ${dummyJwtToken}`)
          .expect(200)
          .expect(res => {
            expect(res.body.errors[0].message).toEqual('Forbidden resource')
          })
      })

      it('should return all users with valid bearer token, but role ADMIN', () => {
        const usersService = app.get(UsersService)
        jest
          .spyOn(usersService, 'findOneByUid')
          .mockImplementation((uid: string): Promise<User> => {
            const user: User = {
              id: '0PIT8EUeuUZvbkxez4HVwKs5GVk1',
              role: Role.ADMIN, // <--- ADMIN
              uid: uid,
            }
            return Promise.resolve(user)
          })

        return request(app.getHttpServer())
          .post(GQL_ENDPOINT)
          .send({
            query: '{ users { id } }',
          })
          .set('Authorization', `Bearer ${dummyJwtToken}`)
          .expect(200)
          .expect(res => {
            expect(res.body.data.users.length).toBe(2)
          })
      })
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
