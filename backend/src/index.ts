import type { Core } from '@strapi/strapi';
import seed from './bootstrap-seed';

const PUBLIC_READ_COLLECTIONS = ['page', 'service', 'project', 'team-member', 'hero-slide'];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * Grants the public role read access to content-facing APIs and
   * create access to the contact form, so the Next.js frontend works
   * against a freshly seeded Strapi instance without manual admin steps.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    const actions = [
      ...PUBLIC_READ_COLLECTIONS.flatMap((api) => [
        `api::${api}.${api}.find`,
        `api::${api}.${api}.findOne`,
      ]),
      'api::site-settings.site-setting.find',
      'api::contact-message.contact-message.create',
    ];

    for (const action of actions) {
      const existing = await strapi.query('plugin::users-permissions.permission').findOne({
        where: { action, role: publicRole.id },
      });

      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action, role: publicRole.id },
        });
      }
    }

    await seed({ strapi });
  },
};
