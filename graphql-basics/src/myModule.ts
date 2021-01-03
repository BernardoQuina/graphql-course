const message = 'Some message from myModule.js'

const name = 'Bernardo'

const location = 'Lisboa'

const getGreeting = (name: string): string => {
  return `Welcome to the course ${name}`
}

export { message, name, getGreeting, location as default }