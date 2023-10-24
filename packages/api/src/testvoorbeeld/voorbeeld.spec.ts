const sum = (a: number, b: number) => {
  return Math.abs(a + b)
}

describe('Voorbeeld van test', () => {
  describe('When sum is called', () => {
    it('should be defined', () => {
      expect(sum).toBeDefined()
    })

    it('should return 3 when 1 + 2', () => {
      expect(sum(1, 2)).toBe(3)
    })

    it('should return -3 when -1 + -2', () => {
      expect(sum(-1, -2)).toBe(-3)
    })
  })
})
