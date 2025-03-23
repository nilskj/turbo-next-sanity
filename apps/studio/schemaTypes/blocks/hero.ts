import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, richTextField } from "../common";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  icon: Star,
  type: "object",
  fields: [
    defineField({
      name: "badge",
      type: "string",
      title: "Badge",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    richTextField,
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    }),
    buttonsField,
    defineField({
      name: "showNewsletterSignup",
      title: "Show Newsletter Signup",
      type: "boolean",
      description: "Toggle to show or hide the newsletter signup form",
      initialValue: false,
    }),
    defineField({
      name: "newsletterSection",
      title: "Newsletter Section",
      type: "object",
      description: "Configure the newsletter signup form",
      hidden: ({ parent }) => !parent?.showNewsletterSignup,
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description: "E.g., 'Subscribe to our newsletter'",
          initialValue: "Subscribe to our newsletter",
        }),
        defineField({
          name: "subheading",
          title: "Subheading",
          type: "text",
          description: "Brief description of what subscribers will receive",
          rows: 2,
        }),
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string",
          description: "Text for the signup button",
          initialValue: "Subscribe",
        }),
        defineField({
          name: "placeholder",
          title: "Email Placeholder",
          type: "string",
          description: "Placeholder text for the email input",
          initialValue: "Your email address",
        }),
        defineField({
          name: "successMessage",
          title: "Success Message",
          type: "string",
          description: "Message shown after successful signup",
          initialValue: "Thanks for subscribing!",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Hero Block",
    }),
  },
});
