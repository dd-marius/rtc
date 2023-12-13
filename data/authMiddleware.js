export default (req, res, next) => {
  if (req.method === 'GET' && req.path === '/userAddress') {
    if (req.query.userId && req.query.userId !== req.user.id.toString()) {
      return res.sendStatus(403); // Forbidden
    }
  }
  next();
};
