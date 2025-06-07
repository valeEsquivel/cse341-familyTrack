const e = require("express");
const mongodb = require("../data/database");
const ObjectID = require("mongodb").ObjectId;

//* Return all members from the database.
const getAll = async (req, res) => {
  //#swagger.tags = ['Member']
  const result = await mongodb.getDB().db().collection("member").find();

  result
    .toArray()
    .then((members) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(members);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch members." });
    });
};

//* This function retrieves a member by its ID from the database.
const getById = async (req, res) => {
  //#swagger.tags = ['Member']
  const memberId = new ObjectID(req.params.id);
  const result = await mongodb
    .getDB()
    .db()
    .collection("member")
    .find({ _id: memberId });

  result
    .toArray()
    .then((member) => {
      if (member.length === 0) {
        return res.status(404).json({ error: "Member not found." });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(member[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch member." });
    });
};

const createMember = async (req, res) => {
  //#swagger.tags = ['Member']
  const memberInfo = {
    name: req.body.name,
    birthday: req.body.birthday,
    email: req.body.email,
    ward: new ObjectID(req.body.wardId),
  };

  const response = await mongodb
    .getDB()
    .db()
    .collection("member")
    .insertOne(memberInfo);

  if (response.acknowledged) {
    res.status(201).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the member.");
  }
};

const updateMember = async (req, res) => {
  //#swagger.tags = ['Member']
  const memberId = new ObjectID(req.params.id);
  const memberInfo = {
    name: req.body.name,
    birthday: req.body.birthday,
    email: req.body.email,
    ward: new ObjectID(req.body.wardId),
  };

  const response = await mongodb
    .getDB()
    .db()
    .collection("member")
    .replaceOne({ _id: memberId }, memberInfo);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "An error occurred while updating the member.");
  }
}

const deleteMember = async (req, res) => {
  //#swagger.tags = ['Member']
  const memberId = new ObjectID(req.params.id);
  const response = await mongodb
    .getDB()
    .db()
    .collection("member")
    .deleteOne({ _id: memberId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "An error occurred while deleting the member.");
  }
}

const verifyMember = async (id) => {
  try {
    const memberId = new ObjectID(id);
    const result = await mongodb
      .getDB()
      .db()
      .collection("member")
      .find({ _id: memberId })
      .toArray();

    return result.length > 0;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getAll,
  getById,
  createMember,
  updateMember,
  deleteMember,
  verifyMember,
};
