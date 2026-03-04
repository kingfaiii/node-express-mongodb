const dbFindOne = async (db, collectionName, query) => {
  return await db.collection(collectionName).findOne(query);
};

const dbInsertOne = async (db, collectionName, data) => {
  return await db.collection(collectionName).insertOne({
    ...data,
    createdAt: new Date(),
  });
};

const dbFind = async (db, collectionName, query = {}, options = {}) => {
  const { projection = {}, sort = {}, limit = 0, skip = 0 } = options;
  return await db
    .collection(collectionName)
    .find(query)
    .project(projection)
    .limit(limit)
    .sort(sort)
    .skip(skip)
    .toArray();
};

const dbUpdateOne = async (db, collectionName, data, id) => {
  return await db
    .collection(collectionName)
    .updateOne({ _id: id }, { $set: { ...data, dateModified: new Date() } });
};
module.exports = { dbFindOne, dbInsertOne, dbFind, dbUpdateOne };
