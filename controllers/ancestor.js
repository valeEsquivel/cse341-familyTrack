const e = require("express");
const mongodb = require("../data/database");
const ObjectID = require("mongodb").ObjectId;

//* Return all ancestors from the database.
const getAll = async (req, res) => {
  //#swagger.tags = ['Ancestor']
  const result = await mongodb.getDB().db().collection("ancestor").find();

  result
    .toArray()
    .then((ancestors) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(ancestors);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch ancestors." });
    });
};

//* This function retrieves a ancestor by its ID from the database.
const getById = async (req, res) => {
  //#swagger.tags = ['Ancestor']
  const ancestorId = new ObjectID(req.params.id);
  const result = await mongodb
    .getDB()
    .db()
    .collection("ancestor")
    .find({ _id: ancestorId });

  result
    .toArray()
    .then((ancestor) => {
      if (ancestor.length === 0) {
        return res.status(404).json({ error: "Ancestor not found." });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(ancestor[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch ancestor." });
    });
};

const createAncestor = async (req, res) => {
  //#swagger.tags = ['Ancestor']

  const ancestorInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    deathdate: req.body.deathdate || "",
    baptisms: req.body.baptisms || false,
    confirmation: req.body.confirmation || false,
    initiatory: req.body.initiatory || false,
    endowment: req.body.endowment || false,
    sealingSpouse: req.body.sealingSpouse || false,
    sealingParents: req.body.sealingParents || false,
    ordinanceCard: req.body.ordinanceCard || "", // This is the card that is printed for the ancestor in base64 format
    responsibleMember: new ObjectID(req.body.memberId),
    mimetypeFile: req.body.mimetypeFile || "",
  };

  const response = await mongodb
    .getDB()
    .db()
    .collection("ancestor")
    .insertOne(ancestorInfo);

  if (response.acknowledged) {
    res.status(201).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while creating the ancestor.");
  }
};

const updateAncestor = async (req, res) => {
  //#swagger.tags = ['Ancestor']
  const ancestorId = new ObjectID(req.params.id);
  const ancestorInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    deathdate: req.body.deathdate || "",
    baptisms: req.body.baptisms || false,
    confirmation: req.body.confirmation || false,
    initiatory: req.body.initiatory || false,
    endowment: req.body.endowment || false,
    sealingSpouse: req.body.sealingSpouse || false,
    sealingParents: req.body.sealingParents || false,
    ordinanceCard: req.body.ordinanceCard || "", // This is the card that is printed for the ancestor in base64 format
    responsibleMember: new ObjectID(req.body.memberId),
    mimetypeFile: req.body.mimetypeFile || "",
  };

  const response = await mongodb
    .getDB()
    .db()
    .collection("ancestor")
    .replaceOne({ _id: ancestorId }, ancestorInfo);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "An error occurred while updating the ancestor.");
  }
}

const deleteAncestor = async (req, res) => {
  //#swagger.tags = ['Ancestor']
  const ancestorId = new ObjectID(req.params.id);
  const response = await mongodb
    .getDB()
    .db()
    .collection("ancestor")
    .deleteOne({ _id: ancestorId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "An error occurred while deleting the ancestor.");
  }
}

module.exports = {
  getAll,
  getById,
  createAncestor,
  updateAncestor,
  deleteAncestor,
};
