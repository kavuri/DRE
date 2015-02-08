'use strict';

/**
 * @ngdoc service
 * @name phrPrototypeApp.notes
 * @description
 * # notes
 * Service in the phrPrototypeApp.
 */
angular.module('phrPrototypeApp')
    .service('notes', function notes($http, format) { //

        var tmpNotes = [];

        this.starNote = function(note_id, star, callback) {
            var comment = {
                "id": note_id,
                "star": star
            };

            console.log("POSTing star ",comment);

            $http.post('/api/v1/notes/star', comment)
                .success(function(data) {
                    console.log("note added successfuly");
                    callback(null, data);
                })
                .error(function(err) {
                    console.log("adding note failed");
                    callback(err);
                });
        };


        this.addNote = function(comment, callback) {
            console.log("POSTing comment ",comment);
            $http.post('/api/v1/notes/add', comment)
                .success(function(data) {
                    console.log("note added successfuly");
                    callback(null, data);
                })
                .error(function(err) {
                    console.log("adding note failed");
                    callback(err);
                });
        };

        this.getNotes = function(callback) {
            console.log('get notes data from API');

            $http.get('/api/v1/notes/all')
                .success(function(data) {
                    callback(null, data);
                }).error(function(err) {
                    callback(err);
                });
        };

        var noteCount = function(callback) {

            this.getNotes(function(err, results) {

                var noteCount = 0;

                _.each(results, function(entry) {
                    _.each(entry.notes, function(note) {
                        if (note.note.starred) {
                            noteCount++;
                        }
                    });
                });

                callback(null, noteCount);
            });
        };

        this.noteCount = noteCount;

    });
