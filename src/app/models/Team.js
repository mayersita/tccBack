const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TeamSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Team', TeamSchema);
