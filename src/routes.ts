import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ ola: 'mundo!' });
});

export default routes;
