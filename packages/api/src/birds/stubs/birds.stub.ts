import { CreateBirdInput } from '../dto/create-bird.input'
import { Bird } from '../entities/bird.entity'
export const createbirdInputStub = (): CreateBirdInput => {
  const b = new CreateBirdInput()
  b.name = 'Example'
  b.fullname = 'Full example name'
  b.category = 'Example cat'
  b.url = 'https://example.com'
  b.observations = 2
  b.description = 'Long example description'
  return b
}

export const birdStub = (): Bird => {
  const b = new Bird()
  b.id = '652e5989204b1d8ef65ed992'
  b.name = 'Example'
  b.fullname = 'Full example name'
  b.category = 'Example cat'
  b.url = 'https://example.com'
  b.observations = 2
  b.description = 'Long example description'
  return b
}
