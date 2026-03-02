const dbFindOne = async (db, collectionName, query) => {
  return await db.collection(collectionName).findOne(query);
};

const dbInsertOne = async (db, collectionName, data) => {
  return await db.collection(collectionName).insertOne({
    ...data,
    createdAt: new Date(),
  });
};

const dbFind = async (db, collectionName, query, limit) => {
  return await db
    .collection(collectionName)
    .find(query)
    .project({ password: 0 })
    .limit(limit)
    .toArray();
};

const dbUpdateOne = async (db, collectionName, data, id) => {
  return await db
    .collection(collectionName)
    .updateOne({ _id: id }, { $set: { ...data, dateModified: new Date() } });
};
module.exports = { dbFindOne, dbInsertOne, dbFind, dbUpdateOne };
