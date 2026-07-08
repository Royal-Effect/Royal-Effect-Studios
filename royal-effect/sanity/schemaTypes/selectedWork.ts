import {defineArrayMember, defineField, defineType} from 'sanity'

const selectedWorkColorClasses = ['bg-surface', 'bg-surface-2'] as const

export const workColorSwatchType = defineType({
  name: 'workColorSwatch',
  title: 'Brand Color Swatch',
  type: 'object',
  fields: [
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      description: 'Pick a color — the name will be auto-generated from the hex code.',
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'foreground',
      title: 'Foreground Override',
      type: 'string',
      description: 'Optional contrast text color (hex). Auto-calculated if left empty.',
    }),
  ],
  preview: {
    select: {
      color: 'color.hex',
    },
    prepare({color}) {
      return {
        title: color ?? 'No color set',
        subtitle: color,
      }
    },
  },
})

export const workAssetType = defineType({
  name: 'workAsset',
  title: 'Work Asset',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'alt',
      media: 'image',
    },
  },
})

export const selectedWorkType = defineType({
  name: 'selectedWork',
  title: 'Selected Work',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color Class',
      type: 'string',
      description: 'Background color class for the project card.',
      options: {
        list: [...selectedWorkColorClasses],
      },
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) =>
        Rule.required().regex(/^\d{4}$/, {
          name: 'year',
          invert: false,
        }),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'brandIdentity',
      title: 'Brand Identity',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'brandDesign',
      title: 'Brand Design',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'searchTerms',
      title: 'Search Terms',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'brandColors',
      title: 'Brand Colors',
      type: 'array',
      of: [defineArrayMember({type: 'workColorSwatch'})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'displayImage',
      title: 'Display Image',
      type: 'workAsset',
      description: 'The main header/display image for the project.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hoverImage',
      title: 'Hover Image',
      type: 'workAsset',
      description: 'Optional image to show on hover in galleries.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      description: 'Upload one or more project images.',
      of: [defineArrayMember({type: 'workAsset'})],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'displayImage.image'
    },
  },
})