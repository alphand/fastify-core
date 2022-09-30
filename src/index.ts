import fastify from 'fastify';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';

const server = fastify({logger: true});
server.register(helmet);
server.register(compress);

// Declare a route
server.get('/', async (_request, _reply) => {
  return {hello: 'world'};
});

// Run the server!
const start = async () => {
  try {
    await server.listen({port: 3000});
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start().then(() => {
  server.log.info('Server is up and running!');
});
