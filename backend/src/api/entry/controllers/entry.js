'use strict';

const { entries } = require('../../../../config/middlewares');

/**
 * entry controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::entry.entry', ({ strapi }) => ({

    async find(ctx) {
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);
        if (!sanitizedQueryParams.filters) {
            sanitizedQueryParams.filters = {}
        }
        sanitizedQueryParams.filters['student'] = ctx.state.user.id

        const { results, pagination } = await strapi.service('api::entry.entry').find(sanitizedQueryParams);
        const sanitizedResults = await this.sanitizeOutput(results, ctx);

        return this.transformResponse(sanitizedResults, { pagination });
    },
    
    async update(ctx) {
        const entityId = ctx.params.id;

        const event = await strapi.entityService.findOne('api::event.event', entityId, {
            populate : {
                entries : {
                    populate : '*',
                    filters : {
                        student : ctx.state.user.id
                    }
                }
            }
        });

        const id = (event.entries[0].id);

        const updateSeen = await strapi.entityService.update('api::entry.entry', id, {
            data : {
                seen_datetime : new Date()
            }
        });

        return updateSeen;
    },

    async accept(ctx) {
        const entityId = ctx.params.id;

        const event = await strapi.entityService.findOne('api::event.event', entityId, {
            populate : {
                entries : {
                    populate : '*',
                    filters : {
                        student : ctx.state.user.id
                    }
                }
            }
        });

        const id = (event.entries[0].id);

        const updateSeen = await strapi.entityService.update('api::entry.entry', id, {
            data : {
                accept_datetime : new Date()
            }
        });

        return updateSeen;
    },
}
));
