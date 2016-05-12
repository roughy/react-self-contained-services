'use strict';

/**
 * Run with: $> node NoteService.js
 */

var express = require('express'),
    path = require('path'),
    app = express(),
    api = express(),
    view = express(),
    port = process.env.npm_package_config_port_noteservice,
    path = '/notes',
    apipath = '/api' + path,
    notes = [{
        title: 'title 1',
        note: 'this is a note'
    }, {
        title: 'title 2',
        note: 'this is another note'
    }],
    content_type_json = 'json',
    content_type_html = 'html',
    status_ok = 200,
    status_created = 201,
    status_nocontent = 204,
    html_options = {
        root: __dirname + '/html/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    },
    html_file_list = 'list.html',
    html_file_edit = 'edit.html';

function info(info) {
    var date = new Date();
    console.info('[%s %s]: %s', date.toLocaleDateString(), date.toLocaleTimeString(), info);
}

function error(error) {
    var date = new Date();
    console.error('[%s %s]: %s', date.toLocaleDateString(), date.toLocaleTimeString(), error);
}

api.post('/', function (req, res) {
    info('API) POST notes');
    res.type(content_type_json)
        .status(status_created)
        .send({});
});

api.get('/', function (req, res) {
    info('(API) GET notes');
    res.type(content_type_json)
        .status(status_ok)
        .send(notes);
});

api.delete('/:title', function (req, res) {
    var title = req.params.title;
    
    info('(API) DELETE note ' + title);
    res.type(content_type_json)
        .sendStatus(status_nocontent);
});

view.get('/', function (req, res) {
    info('(VIEW) GET list view');
    res.type(content_type_html)
        .status(status_ok)
        .sendFile(html_file_list, html_options, function (err) {
            if (err) {
                error(err);
                res.status(err.status).end();
            } else {
                info('Sent file ' + html_file_list);
            }
        });
});

view.get('/edit', function (req, res) {
    console.log('(VIEW) GET list view');
    res.type(content_type_html)
        .status(status_ok)
        .sendFile(html_file_edit, html_options, function (err) {
            if (err) {
                error(err);
                res.status(err.status).end();
            } else {
                info('Sent file ' + html_file_edit);
            }
        });
});

app.listen(port, function () {
    info('Listening on port ' + port);
});

app.use(apipath, api);
app.use(path, view);