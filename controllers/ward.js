const mongodb = require("../data/database");
const ObjectID = require("mongodb").ObjectId;

//* Return all wards from the database.
const getAll = async (req, res) => {
  //#swagger.tags = ['Ward']
  const result = await mongodb.getDB().db().collection("ward").find();

  result
    .toArray()
    .then((wards) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(wards);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch wards." });
    });
};

//* This function retrieves a ward by its ID from the database.
const getById = async (req, res) => {
  //#swagger.tags = ['Ward']
  const wardId = new ObjectID(req.params.id);
  const result = await mongodb
    .getDB()
    .db()
    .collection("ward")
    .find({ _id: wardId });

  result
    .toArray()
    .then((ward) => {
      if (ward.length === 0) {
        return res.status(404).json({ error: "Ward not found." });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(ward[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch ward." });
    });
};

const createWard = async (req, res) => {
  //#swagger.tags = ['Ward']

  const wardInfo = {
    name: req.body.name,
    stake: new ObjectID(req.body.stakeId)
  };

  const response = await mongodb
    .getDB()
    .db()
    .collection("ward")
    .insertOne(wardInfo);

  if (response.acknowledged) {
    res.status(201).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the ward.");
  }
};

const updateWard = async (req, res) => {
  //#swagger.tags = ['Ward']
  const wardId = new ObjectID(req.params.id);

  const wardInfo = {
    name: req.body.name,
    stake: new ObjectID(req.body.stakeId)
  };

  const response = await mongodb
    .getDB()
    .db()
    .collection("ward")
    .replaceOne({ _id: wardId }, wardInfo);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "An error occurred while updating the ward.");
  }
}

const deleteWard = async (req, res) => {
  //#swagger.tags = ['Ward']
  const wardId = new ObjectID(req.params.id);
  const response = await mongodb
    .getDB()
    .db()
    .collection("ward")
    .deleteOne({ _id: wardId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "An error occurred while deleting the ward.");
  }
}

const verifyWard = async (id) => {
  try {
    const wardId = new ObjectID(id);
    const result = await mongodb
      .getDB()
      .db()
      .collection("ward")
      .find({ _id: wardId })
      .toArray();

    return result.length > 0;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getAll,
  getById,
  createWard,
  updateWard,
  deleteWard,
  verifyWard,
};
