import app from './app';

const server = app.listen(app.get('port'), () => {
  console.log('server running');
});

export default server;