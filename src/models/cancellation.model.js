const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const cancelSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    day: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cancelSchema.plugin(toJSON);

/**
 * @typedef Cancellation
 */
const Cancellation = mongoose.model('Cancellation', cancelSchema);

module.exports = Cancellation;
