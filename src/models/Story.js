const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

StorySchema.plugin(mongoosePaginate);

mongoose.model('Story', StorySchema);
