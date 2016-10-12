'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TemplatesSchema = new Schema({
    html: String,
    email: String
});

module.exports = mongoose.model('Templates', TemplatesSchema);
