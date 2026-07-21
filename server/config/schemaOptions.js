// Shared toJSON transform: expose Mongo's _id as a plain `id` string
// so API responses match what the client expects (row.id, item.id, etc.)
const cleanJSON = {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

module.exports = { cleanJSON };
