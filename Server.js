import { RSocketServer } from 'rsocket-core';
import RSocketWebSocketServer from 'rsocket-websocket-server';
import { flowable } from 'rsocket-flowable';

const server = new RSocketServer({
  getRequestHandler: socket => ({
    requestResponse: payload => {
      console.log('Received request:', payload.data);
      return {
        subscribe: subscriber => {
          subscriber.onNext({ data: `Hello, ${payload.data}` });
          subscriber.onComplete();
        }
      };
    },
    requestStream: payload => {
      return flowable(subscriber => {
        let i = 0;
        const interval = setInterval(() => {
          subscriber.onNext({ data: `Message ${i++}` });
          if (i === 5) {
            subscriber.onComplete();
            clearInterval(interval);
          }
        }, 1000);
      });
    }
  }),
  transport: new RSocketWebSocketServer({ port: 8080 })
});

server.start();
console.log('RSocket server running on ws://localhost:8080');
