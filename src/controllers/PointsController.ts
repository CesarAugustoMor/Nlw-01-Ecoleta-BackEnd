import { Request, Response } from 'express';
import knex from '../database/conection';

export default class PointsController {
  async index(req: Request, res: Response): Promise<Response> {
    const { city, uf, items } = req.query;

    const parseredItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parseredItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return res.json(points);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return res.status(400).json({ message: 'Point not found.' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title', 'items.image');

    return res.json({ ...point, items });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const trx = await knex.transaction();

    const point = {
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedsIds = await trx('points').insert(point);

    const pontItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id: insertedsIds[0],
      };
    });

    await trx('point_items').insert(pontItems);

    await trx.commit();

    return res.json({ id: insertedsIds[0], ...point });
  }
}
