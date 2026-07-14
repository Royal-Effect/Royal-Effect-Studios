import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Royal Effect Content')
    .items([
      // ── Portfolio ──────────────────────────────────────────────────────────
      S.listItem()
        .title('Selected Work')
        .icon(() => '🎨')
        .child(S.documentTypeList('selectedWork').title('Selected Work')),

      S.listItem()
        .title('Categories')
        .icon(() => '🏷️')
        .child(S.documentTypeList('category').title('Categories')),

      S.divider(),

      // ── Blog ───────────────────────────────────────────────────────────────
      S.listItem()
        .title('Blog Posts')
        .icon(() => '✍️')
        .child(S.documentTypeList('blog').title('Blog Posts')),

      S.listItem()
        .title('Blog Categories')
        .icon(() => '📂')
        .child(S.documentTypeList('blogCategory').title('Blog Categories')),

      S.divider(),

      // ── FAQs ───────────────────────────────────────────────────────────────
      S.listItem()
        .title('FAQs')
        .icon(() => '❓')
        .child(
          S.documentTypeList('faq')
            .title('FAQs')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
        ),
    ])
