import PropTypes from 'prop-types'

export const propTypes = {
  filter: PropTypes.bool,
  pairSelectorProps: PropTypes.shape({
    currentPair: PropTypes.string.isRequired,
    onPairSelect: PropTypes.func.isRequired,
  }),
  pairsSelectorProps: PropTypes.shape({
    currentFilters: PropTypes.array.isRequired,
    existingPairs: PropTypes.array.isRequired,
    togglePair: PropTypes.func.isRequired,
  }),
  refresh: PropTypes.func,
  symbolSelectorProps: PropTypes.shape({
    currentCoin: PropTypes.string.isRequired,
    onSymbolSelect: PropTypes.func.isRequired,
  }),
  symbolsSelectorProps: PropTypes.shape({
    currentFilters: PropTypes.array.isRequired,
    existingCoins: PropTypes.array.isRequired,
    toggleSymbol: PropTypes.func.isRequired,
  }),
  t: PropTypes.func.isRequired,
  target: PropTypes.string,
  timeframe: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

export const defaultProps = {
  filter: true,
  timeframe: true,
}
