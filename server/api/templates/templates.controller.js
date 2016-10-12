'use strict';

var _ = require('lodash');
var Templates = require('./templates.model');

// Get list of templatess
exports.index = function (req, res) {
    Templates.find(function (err, templatess) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(templatess);
    });
};

// Get a single templates
exports.show = function (req, res) {
    Templates.findById(req.params.id, function (err, templates) {
        if (err) {
            return handleError(res, err);
        }
        if (!templates) {
            return res.status(404).send('Not Found');
        }
        return res.json(templates);
    });
};

// Get a single templates using email
exports.showByEmail = function (req, res) {
    Templates.findOne({email: req.params.email}, function (err, templates) {
        if (err) {
            return handleError(res, err);
        }
        if (!templates) {
            return res.status(404).send('Not Found');
        }
        return res.json(templates);
    });
};

// Creates a new templates in the DB.
exports.create = function (req, res) {
    Templates.findOne({email: req.body.email}, function (err, templates) {
        if (err) {
            return handleError(res, err);
        }
        if (!templates) {
            Templates.create(req.body, function (err, templates) {
                if (err) {
                    return handleError(res, err);
                }
                return res.status(201).json(templates);
            });
        } else {
            return res.status(422).json({'message': 'The specified email address is already in use.'});
        }
    });
};

// Updates an existing templates in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Templates.findById(req.params.id, function (err, templates) {
        if (err) {
            return handleError(res, err);
        }
        if (!templates) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(templates, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(templates);
        });
    });
};

// Updates an existing templates in the DB.
exports.updateByEmail = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Templates.findOne({email: req.params.email}, function (err, templates) {
        if (err) {
            return handleError(res, err);
        }
        if (!templates) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(templates, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(templates);
        });
    });
};

// Deletes a templates from the DB.
exports.destroy = function (req, res) {
    Templates.findById(req.params.id, function (err, templates) {
        if (err) {
            return handleError(res, err);
        }
        if (!templates) {
            return res.status(404).send('Not Found');
        }
        templates.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}
