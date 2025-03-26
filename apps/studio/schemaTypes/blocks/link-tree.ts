import { LinkIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const linkTree = defineType({
  name: "linkTree",
  title: "Link Tree",
  icon: LinkIcon,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
      description: "The title displayed at the top of the link tree section",
      initialValue: "Connect & Discover",
    }),
    defineField({
      name: "cards",
      type: "array",
      title: "Link Cards",
      description: "Add links to display in the grid",
      of: [
        {
          type: "object",
          title: "Link Card",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              description: "The title of the link card",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              type: "string",
              title: "Description",
              description: "A short description of the link",
            }),
            defineField({
              name: "href",
              type: "string",
              title: "Link URL",
              description: "The URL where this link should go",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              type: "image",
              title: "Icon",
              description: "An icon to display with this link",
              options: {
                accept: "image/svg+xml,image/png",
              },
            }),
            defineField({
              name: "badge",
              type: "string",
              title: "Badge Text",
              description:
                "Optional badge text to display (e.g., 'New', 'Updated')",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "href",
              media: "icon",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: title || "Link Tree",
      subtitle: "Link Tree Section",
      media: LinkIcon,
    }),
  },
});
