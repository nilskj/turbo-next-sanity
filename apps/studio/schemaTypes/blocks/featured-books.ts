import { defineType } from "sanity";

export const featuredBooks = defineType({
  name: "featuredBooks",
  title: "Featured Books",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "books",
      title: "Books",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "genres",
              title: "Genres",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "date",
              title: "Date",
              type: "date",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "isNewRelease",
              title: "Is New Release",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "detailsLink",
              title: "Details Link",
              type: "customUrl",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "viewAllLink",
      title: "View All Link",
      type: "customUrl",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: title || "Featured Books",
      };
    },
  },
});
