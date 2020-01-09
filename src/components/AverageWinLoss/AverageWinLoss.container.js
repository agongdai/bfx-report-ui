import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchWinLoss, refresh } from 'state/winLoss/actions'
import {
  getDataReceived,
  getPageLoading,
  getEntries,
  getParams,
} from 'state/winLoss/selectors'

import AverageWinLoss from './AverageWinLoss'

const mapStateToProps = state => ({
  entries: getEntries(state),
  params: getParams(state),
  dataReceived: getDataReceived(state),
  pageLoading: getPageLoading(state),
})

const mapDispatchToProps = {
  fetchWinLoss,
  refresh,
}

const AverageWinLossContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AverageWinLoss))

export default AverageWinLossContainer
