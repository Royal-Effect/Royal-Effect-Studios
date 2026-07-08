import type {SchemaTypeDefinition} from 'sanity'

import {categoryType} from './category'
import {selectedWorkType, workAssetType, workColorSwatchType} from './selectedWork'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, selectedWorkType, workColorSwatchType, workAssetType],
}
