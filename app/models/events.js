const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create schema 
const eventSchema = new Schema({

    name: String,
    slug: {
        type: String,
        unique: true
    },
    description: String

});

// create midleware that the slug is created from the name 
eventSchema.pre('save', function(next){
    this.slug = slugify(this.name);
    next();
})
// function to slugify a name
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// create model

const eventModel = mongoose.model('Event' ,eventSchema);

// export model to use it other files

module.exports = eventModel;

