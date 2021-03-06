import _reduce from 'lodash/reduce'

import SECTION_COLUMNS from 'ui/ColumnsFilter/ColumnSelector/ColumnSelector.columns'

const FILTER_TYPES = {
  GT: '$gt',
  GTE: '$gte',
  LT: '$lt',
  LTE: '$lte',
  NOT: '$not',
  LIKE: '$like',
  EQ: '$eq',
  NE: '$ne',
  IN: '$in',
  NIN: '$nin',
  IS_NULL: '$isNull',
  IS_NOT_NULL: '$isNotNull',
}

export const EMPTY_FILTER = {
  column: '',
  type: '',
  dataType: '',
  value: '',
}

export const FILTERS = {
  CONTAINS: 'contains',
  BEGINS_WITH: 'begins_with',
  ENDS_WITH: 'ends_with',
  EQUAL_TO: 'equal_to',
  NOT_EQUAL_TO: 'not_equal_to',
  GREATER_THAN: 'greater_than',
  GREATER_THAN_EQUAL: 'greater_than_equal',
  LESS_THAN: 'less_than',
  LESS_THAN_EQUAL: 'less_than_equal',
}

// calculates all keys used as filters based on defined columns
export const FILTER_KEYS = _reduce(SECTION_COLUMNS, (acc, columns) => {
  columns.filter(column => column.filter).forEach(({ id }) => {
    if (!acc[id]) {
      acc[id] = true
    }
  })

  return acc
}, {})

export const FILTER_QUERY_TYPES = {
  [FILTERS.CONTAINS]: 'ct',
  [FILTERS.BEGINS_WITH]: 'bw',
  [FILTERS.ENDS_WITH]: 'ew',
  [FILTERS.EQUAL_TO]: 'eq',
  [FILTERS.NOT_EQUAL_TO]: 'ne',
  [FILTERS.GREATER_THAN]: 'gt',
  [FILTERS.LESS_THAN]: 'lt',
}

export default FILTER_TYPES
