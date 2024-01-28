// @ts-nocheck
'use strict';

const event = require('../routes/event');

/**
 * event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
    async find(ctx) {
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);
        if (!sanitizedQueryParams.filters) {
            sanitizedQueryParams.filters = {}
        }
        sanitizedQueryParams.filters['owner'] = ctx.state.user.id

        const { results, pagination } = await strapi.service('api::event.event').find(sanitizedQueryParams);
        const sanitizedResults = await this.sanitizeOutput(results, ctx);

        return this.transformResponse(sanitizedResults, { pagination });
    },
    async findOne(ctx) {
        const entityId = ctx.params.id;
        const response = await strapi.entityService.findOne('api::event.event', entityId)
        const checker = await strapi.entityService.findOne('api::event.event', entityId, {
            populate: { owner: entityId }
        });

        if (!checker) {
            return ctx.notFound(`Not Found`);
        }

        if (checker.owner.id != ctx.state.user.id) {
            return ctx.unauthorized("You don't have a permission to access this event");
        }

        else {
            ctx.body = { 'owner': ctx.state.user.username, response }
        }
    },

    async create(ctx) {
        const requestBody = ctx.request.body;
        const event = await strapi.entityService.create('api::event.event', {
            populate: '*',
            data: {
                title: requestBody.title,
                effective_datetime: requestBody.time,
                full_marks : requestBody.full_marks,
                publishedAt: new Date(),
                owner: {
                    id: ctx.state.user.id
                }
            },
        });
        return event
    },

    async update(ctx) {
        const entityId = ctx.params.id;

        const event = await strapi.entityService.findOne('api::event.event', entityId, {
            populate: { owner: true },
        });

        if (!event) {
            return ctx.notFound(`Not Found`);
        }

        if (event.owner?.id !== ctx.state.user.id) {
            return ctx.unauthorized(`You don't have permission to update this entry`);
        }

        return await super.update(ctx);
    },

    async postEntries(ctx) {
        const entityId = ctx.params.id
        const requestBody = ctx.request.body
        const postEntry = await strapi.entityService.create('api::entry.entry', {
            populate: ['event', 'student'],
            data: {
                "result": requestBody.result,
                "publishedAt": new Date(),
                "event": {
                    "id": requestBody.eventID,
                },
                "student": {
                    "id": requestBody.studentID,
                }

            }
        });
        return postEntry
    },

    async listEntries(ctx) {
        const entityId = ctx.params.id;
        const entries = await strapi.entityService.findMany('api::entry.entry', {
            populate: '*'
        })

        const findOwner = await strapi.entityService.findMany('api::event.event', {
            populate: {
                owner: true
            }
        }
        );

        const title = []
        for (const i of findOwner) {
            if (i.owner.id == ctx.state.user.id) {
                title.push(i.title)
            }
        }

        const results = []
        for (const i of entries) {
            if (i.event) {
                for (const j of title)
                    if (i.event.title == j) {
                        results.push(i)
                    }
            }
        }

        const newResult = results.map(item => {
            return {
                ...item,
                createdBy: undefined,
                updatedBy: undefined,
            };
        });
        return newResult
    },

    async listStudentRelated(ctx) {
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);
        if (!sanitizedQueryParams.filters) {
            sanitizedQueryParams.filters = {}
        }
        sanitizedQueryParams.filters['entries'] = {
            owner: ctx.state.user.id
        }

        const { results, pagination } = await strapi.service('api::event.event').find(sanitizedQueryParams);
        const sanitizedResults = await this.sanitizeOutput(results, ctx);

        // @ts-ignore
        for (const event of sanitizedResults) {
            const { results } = await strapi.service('api::entry.entry').find({
                filters: {
                    event: event['id'],
                    student: ctx.state.user.id,
                }
            })
            if (results.length > 0) {
                event['entry'] = results[0]
            }
        }

        return this.transformResponse(sanitizedResults, { pagination });
    },

    async allStudent(ctx) {
        const listStudent = await strapi.entityService.findMany('plugin::users-permissions.user', {
            populate: 'role',
            filters: {
                role: {
                    name: 'student'
                }
            }
        })
        return listStudent
    },

    async upload(ctx) {
        const event = await strapi.db.query('api::event.event').findMany()
        const request = ctx.request.body
        const title = request.title
        for (const eTitle of event) {
            if (eTitle.title == title) {
                const eventID = eTitle.id
                const postEntry = await strapi.entityService.create('api::entry.entry', {
                    populate: ['event', 'student'],
                    data: {
                        "result": request.result,
                        "publishedAt": new Date(),
                        "event": {
                            "id": eventID,
                        },
                        "student": {
                            "id": request.student,
                        }
                    }
                });
                return "event duplicated so i update"
            }
        }
        const uploadEvent = await strapi.entityService.create('api::event.event', {
            populate: '*',
            data: {
                title: request.title,
                effective_datetime: request.time,
                publishedAt: new Date(),
                owner: {
                    id: ctx.state.user.id
                }
            },
        });
        if (uploadEvent) {
            const uploadEntry = await strapi.entityService.create('api::entry.entry', {
                populate: ['event', 'student'],
                data: {
                    "result": request.result,
                    "publishedAt": new Date(),
                    "event": {
                        "id": uploadEvent.id,
                    },
                    "student": {
                        "id": request.student,
                    }
                }
            });
        }

        return "no event so we create and post entry"
    }
})
);
