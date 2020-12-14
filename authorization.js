exports.isAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    next();
}


