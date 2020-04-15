import { connect } from 'react-redux'

import { getEmail } from 'state/query/selectors'
import { logout } from 'state/auth/actions'
import { togglePreferencesDialog } from 'state/ui/actions'

import AccountMenu from './AccountMenu'

const mapStateToProps = state => ({
  email: getEmail(state),
})

const mapDispatchToProps = {
  logout,
  togglePrefDialog: togglePreferencesDialog,
}

const AccountMenuContainer = connect(mapStateToProps, mapDispatchToProps)(AccountMenu)

export default AccountMenuContainer
