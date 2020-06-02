import { Router } from 'express';
import knex from './database/conection';

const routes = Router();

routes.get('/items', async (req, res) => {
  const itens = await knex('items').select('*');

  const serializedItems = itens.map(item => {
    return {
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });

  return res.json(serializedItems);
});

export default routes;
