'use strict';

module.exports = {
    routes: [ //custom routes
        {
            method: 'PUT',
            path: '/accept/:id',
            handler: 'entry.accept'
        }
    ]
}