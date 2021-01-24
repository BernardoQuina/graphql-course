import { getFirstName, isValidPassword } from '../util/user'

test('Should return first name when given full name', () => {
  const firstName = getFirstName('Bernardo Quina')

  expect(firstName).toBe('Bernardo')
})

test('Should return first name when given first name', () => {
  const firstName = getFirstName('Jen')

  expect(firstName).toBe('Jen')
})

test('Should reject password shorter than 8 characters', () => {
  const isValid = isValidPassword('short')

  expect(isValid).toBe(false)
})

test('Should reject password that contains word password',() => {
  const isValid = isValidPassword('password')

  expect(isValid).toBe(false)
})