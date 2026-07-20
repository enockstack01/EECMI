const { clerkMiddleware, clerkClient, getAuth } = require('@clerk/express');

const requireSignedIn = (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Not authorised. Please sign in.' });
  }
  req.clerkUserId = userId;
  next();
};

const requireRole = (...roles) => async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authorised. Please sign in.' });
    }
    const user = await clerkClient.users.getUser(userId);
    const role = user.publicMetadata?.role || 'user';
    if (!roles.includes(role)) {
      return res.status(403).json({ success: false, message: 'You do not have permission to access this resource.' });
    }
    req.clerkUserId = userId;
    req.clerkUser = user;
    req.role = role;
    next();
  } catch (err) {
    console.error('Role check failed:', err);
    res.status(500).json({ success: false, message: 'Failed to verify permissions.' });
  }
};

module.exports = { clerkMiddleware, clerkClient, requireSignedIn, requireRole };
