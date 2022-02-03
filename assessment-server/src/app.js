import express from 'express';
import cors from 'cors';
import schema from './schema'
import { graphqlHTTP } from 'express-graphql';

const port = process.env.PORT || 5000; // set the port
const app = express(); // create our app w/ express
app.use(cors());

app.use(`/graphql`,graphqlHTTP({
  schema,
  graphiql:true
}))

app.listen(port);
console.log('Server is listening on port ' + port);

export default app;
