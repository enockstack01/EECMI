const { clerkClient } = require('@clerk/express');

const superAdminEmails = () =>
  (process.env.SUPER_ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

const primaryEmail = (user) =>
  user.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress
  || user.emailAddresses?.[0]?.emailAddress
  || '';

const toProfile = (user, role) => ({
  id: user.id,
  name: [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || primaryEmail(user),
  email: primaryEmail(user),
  imageUrl: user.imageUrl,
  role,
});

// Bootstraps a role for a first-time sign-in; idempotent once a role is set.
exports.syncRole = async (req, res) => {
  try {
    const userId = req.clerkUserId;
    let user = await clerkClient.users.getUser(userId);
    let role = user.publicMetadata?.role;

    if (!role) {
      const email = primaryEmail(user).toLowerCase();
      role = superAdminEmails().includes(email) ? 'super_admin' : 'user';
      user = await clerkClient.users.updateUserMetadata(userId, { publicMetadata: { role } });
      role = user.publicMetadata.role;
    }

    res.json({ success: true, role, profile: toProfile(user, role) });
  } catch (err) {
    console.error('sync-role error:', err);
    res.status(500).json({ success: false, message: 'Failed to sync role.' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.clerkUserId);
    const role = user.publicMetadata?.role || 'user';
    res.json({ success: true, profile: toProfile(user, role) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load profile.' });
  }
};
