export const getFirstName = (fullName: string) => {
  return fullName.split(' ')[0]
}

export const isValidPassword = (password: string) => {
  return password.length >= 8 && !password.includes('password')
}