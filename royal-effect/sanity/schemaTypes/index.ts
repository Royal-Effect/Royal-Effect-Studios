import type {SchemaTypeDefinition} from 'sanity'

import {categoryType} from './category'
import {selectedWorkType, workAssetType, workColorSwatchType} from './selectedWork'
import {blogType} from './Blog'
import {blogCategoryType} from './BlogCategory'
import {faqType} from './faq'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, selectedWorkType, workColorSwatchType, workAssetType, blogType, blogCategoryType, faqType],
}
