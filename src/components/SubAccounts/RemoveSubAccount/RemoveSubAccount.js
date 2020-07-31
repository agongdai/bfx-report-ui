import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'

import { propTypes, defaultProps } from './RemoveSubAccount.props'

class RemoveSubAccount extends PureComponent {
  removeSubAccount = () => {
    const { removeSubAccount } = this.props
    removeSubAccount()
  }

  render() {
    const { t } = this.props

    return (
      <Button
        className='section-sub-accounts-remove mt20'
        intent={Intent.PRIMARY}
        onClick={this.removeSubAccount}
      >
        {t('subaccounts.remove')}
      </Button>
    )
  }
}

RemoveSubAccount.propTypes = propTypes
RemoveSubAccount.defaultProps = defaultProps

export default withTranslation('translations')(RemoveSubAccount)
