import express from 'express';
import cors from 'cors';
import router from './router';
// import checkToken from './middlewares/token-check'
const app = express();

app.use(cors());
app.use(express.json());
// app.use(checkToken) --for authentication-authorization
app.use(router);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(' 🚀 Server listening on https://localhost:8080/ 🚀');
});

export default app;
