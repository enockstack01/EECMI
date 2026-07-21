const dns = require('dns');
const mongoose = require('mongoose');

const connectDB = () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Check your .env file.');
  }

  // mongodb+srv:// needs a DNS SRV lookup. Some networks hand Node a
  // resolver (e.g. a local proxy on 127.0.0.1) that refuses SRV queries
  // even though it handles normal A/AAAA lookups fine, so fall back to
  // public resolvers for the SRV/TXT lookups the driver depends on.
  if (uri.startsWith('mongodb+srv://')) {
    dns.setServers([...dns.getServers(), '8.8.8.8', '1.1.1.1']);
  }

  mongoose.set('strictQuery', true);
  return mongoose.connect(uri);
};

module.exports = { mongoose, connectDB };
