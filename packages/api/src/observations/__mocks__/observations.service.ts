import { observationStub } from '../stubs/observations.stub'

export const ObservationsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(observationStub()),
})
