import { ObjectId } from 'mongodb'
import { CreateObservationInput } from '../dto/create-observation.input'
import { Observation } from '../entities/observation.entity'
export const createObservationInputStub = (): CreateObservationInput => {
  const o = new CreateObservationInput()
  o.userUid = '1234567890'
  o.birdId = '652e5989204b1d8ef65ed992'
  o.locationId = '652e5994812989da79ecd326'
  o.description = 'Example description'
  o.geolocation = {
    type: 'Point',
    coordinates: [1, 1],
  }
  return o
}

export const observationStub = (): Observation => {
  const o = new Observation()
  o.id = new ObjectId('652e5994812989da79ecd327')
  o.userUid = '1234567890'
  o.birdId = new ObjectId('652e5989204b1d8ef65ed992')
  o.locationId = new ObjectId('652e5994812989da79ecd326')
  o.description = 'Example description'
  o.geolocation = {
    type: 'Point',
    coordinates: [1, 1],
  }
  return o
}
