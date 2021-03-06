import { Request, Response } from 'express';
import knex from '../database/conection';

export default class ItemsController {
  async index(req: Request, res: Response): Promise<Response> {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.6:3333/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}
