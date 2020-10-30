const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");
const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 32,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserModel.pre('save', async function(next){
  if (!)
})
UserModel.virtual("password")
  .set((password) => {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encrypt(password);
  })
  .get(function () {
    return this._password;
  });

module.exports = mongoose.model("User", UserModel);
