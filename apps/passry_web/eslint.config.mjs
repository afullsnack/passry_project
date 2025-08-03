//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    rules: {
      // 'react/jsx-no-constructed-context-values': 'off',
      // 'react/jsx-no-useless-fragment': 'off',
      // 'react/jsx-props-no-spreading': 'off',
      // 'react/react-in-jsx-scope': 'off',
      // 'react/require-default-props': 'off',
      // 'react/require-optimization': 'off',
      // 'react/require-render-return': 'off',
      // 'react/self-closing-comp': 'off',
      // 'react/sort-comp': 'off',
      // 'react/sort-prop-types': 'off',
      // 'react/state-in-constructor': 'off',
      // 'react/static-property-placement': 'off',
      // 'react/style-prop-object': 'off',
      // 'react/void-dom-elements-no-children': 'off',
      'import/order': 'off',
    },
  },
]
