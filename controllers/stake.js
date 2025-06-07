const mongodb = require("../data/database");
const ObjectID = require("mongodb").ObjectId;

//* Return all stakes from the database.
const getAll = async (req, res) => {
  //#swagger.tags = ['Stake']
  const result = await mongodb.getDB().db().collection("stake").find();

  result
    .toArray()
    .then((stakes) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(stakes);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch stakes." });
    });
};

//* This function retrieves a stake by its ID from the database.
const getById = async (req, res) => {
  //#swagger.tags = ['Stake']
  const stakeId = new ObjectID(req.params.id);
  const result = await mongodb
    .getDB()
    .db()
    .collection("stake")
    .find({ _id: stakeId });

  result
    .toArray()
    .then((stake) => {
      if (stake.length === 0) {
        return res.status(404).json({ error: "Stake not found." });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(stake[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch stake." });
    });
};

const createStake = async (req, res) => {
  //#swagger.tags = ['Stake']
  const stakeInfo = {
    country: req.body.country,
    name: req.body.name,
  };

  const response = await mongodb
    .getDB()
    .db()
    .collection("stake")
    .insertOne(stakeInfo);

  if (response.acknowledged) {
    res.status(201).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the stake.");
  }
};

const updateStake = async (req, res) => {
  //#swagger.tags = ['Stake']
  const stakeId = new ObjectID(req.params.id);
  const stakeInfo = {
    country: req.body.country,
    name: req.body.name,
  };

  const response = await mongodb
    .getDB()
    .db()
    .collection("stake")
    .replaceOne({ _id: stakeId }, stakeInfo);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while updating the stake.");
  }
};

const deleteStake = async (req, res) => {
  //#swagger.tags = ['Stake']
  const stakeId = new ObjectID(req.params.id);
  const response = await mongodb
    .getDB()
    .db()
    .collection("stake")
    .deleteOne({ _id: stakeId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while deleting the stake.");
  }
};

const verifyStake = async (id) => {
  try {
    const stakeId = new ObjectID(id);
    const result = await mongodb
      .getDB()
      .db()
      .collection("stake")
      .find({ _id: stakeId })
      .toArray();

    return result.length > 0;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getAll,
  getById,
  createStake,
  updateStake,
  deleteStake,
  verifyStake,
};
