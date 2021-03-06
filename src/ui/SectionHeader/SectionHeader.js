import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'

import ColumnsFilter from 'ui/ColumnsFilter'
import TimeRange from 'ui/TimeRange'
import RefreshButton from 'ui/RefreshButton'
import MultiPairSelector from 'ui/MultiPairSelector'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import PairSelector from 'ui/PairSelector'
import SymbolSelector from 'ui/SymbolSelector'

import { propTypes, defaultProps } from './SectionHeader.props'
import {
  SectionHeader as SectionHeaderWrapper,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
} from './SectionHeader.components'

class SectionHeader extends PureComponent {
  getSelector = () => {
    const {
      pairSelectorProps,
      pairsSelectorProps,
      symbolSelectorProps,
      symbolsSelectorProps,
    } = this.props

    if (symbolSelectorProps) {
      return <SymbolSelector {...symbolSelectorProps} />
    }
    if (symbolsSelectorProps) {
      return <MultiSymbolSelector {...symbolsSelectorProps} />
    }
    if (pairSelectorProps) {
      return <PairSelector {...pairSelectorProps} />
    }
    if (pairsSelectorProps) {
      return <MultiPairSelector {...pairsSelectorProps} />
    }

    return null
  }

  render() {
    const {
      filter,
      refresh,
      t,
      target,
      timeframe,
      title,
    } = this.props

    const selector = this.getSelector()

    return (
      <SectionHeaderWrapper>
        <SectionHeaderTitle>{t(title)}</SectionHeaderTitle>
        {timeframe && <TimeRange className='section-header-time-range' />}
        {(selector || filter || refresh) && (
          <SectionHeaderRow>
            {selector && (
              <SectionHeaderItem>
                <SectionHeaderItemLabel>
                  {t('selector.filter.symbol')}
                </SectionHeaderItemLabel>
                {selector}
              </SectionHeaderItem>
            )}
            {filter && <ColumnsFilter target={target} />}
            {refresh && <RefreshButton onClick={refresh} />}
          </SectionHeaderRow>
        )}
      </SectionHeaderWrapper>
    )
  }
}

SectionHeader.propTypes = propTypes
SectionHeader.defaultProps = defaultProps

export default withTranslation('translations')(SectionHeader)
