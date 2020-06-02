import express from 'express';

const app = express();

app.use(express.json());

const users = ['Diego', 'Cleiton', 'Robson', 'Daniel'];

app.get('/users', (req, res) => {
  const { search } = req.query;

  const filteredUsers = search
    ? users.filter(user => user.includes(String(search)))
    : users;

  return res.json(filteredUsers);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  return res.json({ user: users[Number(id)] });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const user = {
    name,
    email,
  };

  return res.json(user);
});

app.listen(3333);
