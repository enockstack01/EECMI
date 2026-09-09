const { getAuth, clerkClient } = require('@clerk/express');

// The Clerk middleware runs on every /api route, so getAuth(req) resolves on
// public routes too whenever the client sends a bearer token. Returns null for
// anonymous requests.
const getClerkUserId = (req) => {
  try {
    return getAuth(req).userId || null;
  } catch {
    return null;
  }
};

const primaryEmail = (user) =>
  user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress
  || user?.emailAddresses?.[0]?.emailAddress
  || '';

/** Fetch the full Clerk user + primary email for a signed-in request. */
const getClerkUser = async (userId) => {
  const user = await clerkClient.users.getUser(userId);
  return { user, email: primaryEmail(user).toLowerCase() };
};

module.exports = { getClerkUserId, getClerkUser, primaryEmail };
