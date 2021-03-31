export default {
  'GET /api/users': { users: [1, 2] },
  '/api/users/1': { id: 1 },
  'POST /api/file/118': (req: any, res: any) => {
    const { attribute1, attribute2, attribute5 } = req.body;
    console.log(attribute1, attribute2, attribute5)
    if(attribute1 || attribute2 || attribute5) {
      res.send({ code: 0, data: {...req.body} });
    } else {
      res.send({ code: 1, data: {} });
    }
  },
};