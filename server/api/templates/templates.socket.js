/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Templates = require('./templates.model');

exports.register = function (socket) {
    Templates.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Templates.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('templates:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('templates:remove', doc);
}
