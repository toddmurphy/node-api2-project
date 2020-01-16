const express = require('express');
const expressRouter = require('./routes/expressRouter');

const server = express();

const port = process.env.PORT || 4000;

server.use('/api/posts', expressRouter);
server.get('/', (req, res) => {
  res.send('Server running working fine!');
});

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
