exports.allow = (allowedRoles = []) => {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) return res.status(403).json({ message: 'Role missing' });
    if (!allowedRoles.includes(role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
};
