import React, { Fragment, PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import AccountBalance from 'components/AccountBalance'
import AffiliatesEarnings from 'components/AffiliatesEarnings'
import AverageWinLoss from 'components/AverageWinLoss'
import ConcentrationRisk from 'components/ConcentrationRisk'
import Derivatives from 'components/Derivatives'
import FrameworkDialog from 'components/FrameworkDialog'
import FundingCreditHistory from 'components/FundingCreditHistory'
import FundingLoanHistory from 'components/FundingLoanHistory'
import FundingOfferHistory from 'components/FundingOfferHistory'
import FundingPayment from 'components/FundingPayment'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import OrderTrades from 'components/OrderTrades'
import Positions from 'components/Positions'
import PositionsActive from 'components/PositionsActive'
import PositionsAudit from 'components/PositionsAudit'
import PositionsAuditNoId from 'components/PositionsAudit/PositionsAudit.NoId'
import PublicFunding from 'components/PublicFunding'
import PublicTrades from 'components/PublicTrades'
import Snapshots from 'components/Snapshots'
import TaxReport from 'components/TaxReport'
import Tickers from 'components/Tickers'
import TradedVolume from 'components/TradedVolume'
import Trades from 'components/Trades'
import Wallets from 'components/Wallets'
import ExportDialog from 'components/ExportDialog'
import queryType from 'state/query/constants'
import { getPath, getTarget } from 'state/query/utils'
import ToggleMenu from 'ui/ToggleMenu'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './Main.props'
import CustomDialog from './CustomDialog'

const {
  MENU_ACCOUNT_BALANCE,
  MENU_AFFILIATES_EARNINGS,
  MENU_CONCENTRATION_RISK,
  MENU_DERIVATIVES,
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_ORDER_TRADES,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_TAX_REPORT,
  MENU_TICKERS,
  MENU_TRADED_VOLUME,
  MENU_WALLETS,
  MENU_WIN_LOSS,
} = queryType

const TAX_REPORT_SECTION = '/:section(start_snapshot|end_snapshot|result)'

class Main extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClickCustom = this.handleCustomDialog.bind(this, true)
    this.handleCustomDialogClose = this.handleCustomDialog.bind(this, false)
    this.handleClickExport = this.handleExportDialog.bind(this, true)
    this.handleExportDialogClose = this.handleExportDialog.bind(this, false)
  }

  state = {
    isExportOpen: false,
    startDate: null,
    endDate: new Date(),
  }

  handleCustomDialog = (show, e) => {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.showCustomDialog(show)
  }

  handleRangeChange = (range) => {
    const [startDate, endDate] = range
    this.setState({
      startDate,
      endDate,
    })
  }

  startQuery = () => {
    const { startDate, endDate } = this.state
    const { setCustomTimeRange, showCustomDialog } = this.props
    if (startDate !== null && endDate !== null) {
      setCustomTimeRange(startDate.getTime(), endDate.getTime())
    }
    showCustomDialog(false)
  }

  handleExportDialog = (show, e) => {
    e.preventDefault()
    if (show) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.prepareExport()
    }
    this.setState({ isExportOpen: show })
  }

  startExport = (currentTargets) => {
    const { exportCsv } = this.props
    return () => {
      exportCsv(currentTargets)
      this.setState({ isExportOpen: false })
    }
  }

  render() {
    const {
      authStatus,
      authIsShown,
      history,
      isCustomOpen,
      isFrameworkOpen,
      location,
      menuMode,
    } = this.props
    const {
      endDate,
      isExportOpen,
      startDate,
    } = this.state
    const target = getTarget(location.pathname)

    return authStatus && !authIsShown ? (
      <div className='row'>
        <ToggleMenu
          target={target}
          handleClickCustom={this.handleClickCustom}
          history={history}
          menuMode={menuMode}
        />
        <div className='bitfinex-dataset'>
          <Switch>
            <Route
              exact
              path='/'
              render={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_LEDGERS)}
              render={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_LEDGERS)}/:symbol`}
              render={() => <Ledgers handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_TRADES)}
              render={() => <Trades handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_TRADES)}/:pair`}
              render={() => <Trades handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_ORDERS)}
              render={() => <Orders handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_ORDERS)}/:pair`}
              render={() => <Orders handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_ORDER_TRADES)}
              render={() => <OrderTrades handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_ORDER_TRADES)}/:pair`}
              render={() => <OrderTrades handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_DEPOSITS)}
              render={() => <Movements type={MENU_DEPOSITS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_DEPOSITS)}/:symbol`}
              render={() => <Movements type={MENU_DEPOSITS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_WITHDRAWALS)}
              render={() => <Movements type={MENU_WITHDRAWALS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_WITHDRAWALS)}/:symbol`}
              render={() => <Movements type={MENU_WITHDRAWALS} handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FCREDIT)}
              render={() => <FundingCreditHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FCREDIT)}/:symbol`}
              render={() => <FundingCreditHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FLOAN)}
              render={() => <FundingLoanHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FLOAN)}/:symbol`}
              render={() => <FundingLoanHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FOFFER)}
              render={() => <FundingOfferHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FOFFER)}/:symbol`}
              render={() => <FundingOfferHistory handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path='/'
              render={() => <FundingPayment handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_FPAYMENT)}
              render={() => <FundingPayment handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_FPAYMENT)}/:symbol`}
              render={() => <FundingPayment handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_AFFILIATES_EARNINGS)}
              render={() => <AffiliatesEarnings handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_AFFILIATES_EARNINGS)}/:symbol`}
              render={() => <AffiliatesEarnings handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_PUBLIC_FUNDING)}
              render={() => <PublicFunding handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_PUBLIC_FUNDING)}/:symbol`}
              render={() => <PublicFunding handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_PUBLIC_TRADES)}
              render={() => <PublicTrades handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_PUBLIC_TRADES)}/:pair`}
              render={() => <PublicTrades handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_TICKERS)}
              render={() => <Tickers handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_TICKERS)}/:pair`}
              render={() => <Tickers handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_DERIVATIVES)}
              render={() => <Derivatives handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_DERIVATIVES)}/:pair`}
              render={() => <Derivatives handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_POSITIONS_AUDIT)}
              render={() => <PositionsAuditNoId />}
            />
            <Route
              path={`${getPath(MENU_POSITIONS_AUDIT)}/:id`}
              render={() => <PositionsAudit handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={getPath(MENU_POSITIONS_ACTIVE)}
              render={() => <PositionsActive handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_POSITIONS)}
              render={() => <Positions handleClickExport={this.handleClickExport} />}
            />
            <Route
              path={`${getPath(MENU_POSITIONS)}/:pair`}
              render={() => <Positions handleClickExport={this.handleClickExport} />}
            />
            <Route
              exact
              path={getPath(MENU_WALLETS)}
              render={() => <Wallets handleClickExport={this.handleClickExport} />}
            />
            {platform.showFrameworkMode && (
              <Fragment>
                <Route
                  exact
                  path={getPath(MENU_ACCOUNT_BALANCE)}
                  component={() => <AccountBalance handleClickExport={this.handleClickExport} />}
                />
                <Route
                  path={[getPath(MENU_TRADED_VOLUME), `${getPath(MENU_TRADED_VOLUME)}/:pair`]}
                  render={() => <TradedVolume handleClickExport={this.handleClickExport} />}
                />
                <Route
                  exact
                  path={getPath(MENU_WIN_LOSS)}
                  component={() => <AverageWinLoss handleClickExport={this.handleClickExport} />}
                />
                <Route
                  exact
                  path={getPath(MENU_CONCENTRATION_RISK)}
                  component={ConcentrationRisk}
                />
                <Route
                  exact
                  path={getPath(MENU_SNAPSHOTS)}
                  render={() => <Snapshots handleClickExport={this.handleClickExport} />}
                />

                <Route
                  exact
                  path={getPath(MENU_TAX_REPORT)}
                  render={() => <TaxReport handleClickExport={this.handleClickExport} />}
                />
                <Route
                  path={`${getPath(MENU_TAX_REPORT)}/:section(result)`}
                  render={() => <TaxReport handleClickExport={this.handleClickExport} />}
                />
                <Route
                  path={`${getPath(MENU_TAX_REPORT)}${TAX_REPORT_SECTION}/:subsection(positions|tickers|wallets)`}
                  render={() => <TaxReport handleClickExport={this.handleClickExport} />}
                />
              </Fragment>
            )}
          </Switch>
        </div>
        <CustomDialog
          type={target}
          isCustomOpen={isCustomOpen}
          handleCustomDialogClose={this.handleCustomDialogClose}
          handleRangeChange={this.handleRangeChange}
          startQuery={this.startQuery}
          startDate={startDate}
          endDate={endDate}
        />
        <ExportDialog
          type={target}
          isExportOpen={isExportOpen}
          handleExportDialogClose={this.handleExportDialogClose}
          startExport={this.startExport}
        />
        {platform.showFrameworkMode && <FrameworkDialog isFrameworkOpen={isFrameworkOpen} />}
      </div>
    ) : ''
  }
}

Main.propTypes = propTypes
Main.defaultProps = defaultProps

export default Main
