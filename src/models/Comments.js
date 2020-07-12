const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CommentSchema = new mongoose.Schema({
  idStory: {
    type: String,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CommentSchema.plugin(mongoosePaginate);

mongoose.model('Comments', CommentSchema);
