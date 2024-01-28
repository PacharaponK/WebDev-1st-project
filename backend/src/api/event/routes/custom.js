'use strict';

module.exports = {
    routes: [ //custom routes
        {
            method: 'POST',
            path: '/events/:id/entries',
            handler: 'event.postEntries'
        },
        {
            method: 'GET',
            path: '/events/:id/entries',
            handler: 'event.listEntries'
        },
        {
            method: 'GET',
            path: '/events/studentRelated',
            handler: 'event.listStudentRelated'
        },
        {
            method: 'GET',
            path: '/events/allStudent',
            handler: 'event.allStudent'
        },
        {
            method: 'POST',
            path: '/events/upload',
            handler: 'event.upload'
        },
    ]
}
