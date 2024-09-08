import { name, version, repository } from '../../package.json'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${name} API documentation`,
      version: version,
      description: 'API documentation for the authentication service',
      license: {
        name: 'MIT',
        url: repository.url,
      },
    },
  },
  apis: ['src/routes/*.ts', 'src/validations/*.ts'],
}

export default options
