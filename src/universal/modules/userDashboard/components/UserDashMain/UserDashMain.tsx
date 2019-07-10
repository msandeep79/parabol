import React, {lazy, Suspense} from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet'
import {matchPath, Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import DashHeader from 'universal/components/Dashboard/DashHeader'
import DashMain from 'universal/components/Dashboard/DashMain'
import Tab from 'universal/components/Tab/Tab'
import Tabs from 'universal/components/Tabs/Tabs'
import LoadingComponent from '../../../../components/LoadingComponent/LoadingComponent'
import {LoaderSize} from '../../../../types/constEnums'
import {PALETTE} from 'universal/styles/paletteV2'

const TabBody = styled('div')({
  backgroundColor: PALETTE.BACKGROUND_MAIN,
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  height: '100%'
})

const TopTabs = styled(Tabs)({
  marginTop: 12
})

interface Props extends RouteComponentProps<{}> {}

const MyDashboardTasksRoot = lazy(() =>
  import(/* webpackChunkName: 'MyDashboardTasksRoot' */ 'universal/components/MyDashboardTasksRoot')
)
const MyDashboardTimelineRoot = lazy(() =>
  import(/* webpackChunkName: 'MyDashboardTimelineRoot' */ 'universal/components/MyDashboardTimelineRoot')
)

const UserDashMain = (props: Props) => {
  const {history, match} = props
  const isTasks = !!matchPath(location.pathname, {path: `${match.url}/tasks`})
  return (
    <DashMain>
      <Helmet title='My Dashboard | Parabol' />
      <DashHeader area='userDash'>
        <TopTabs activeIdx={isTasks ? 1 : 0}>
          <Tab label='TIMELINE' onClick={() => history.push('/me')} />
          <Tab label='TASKS' onClick={() => history.push('/me/tasks')} />
        </TopTabs>
      </DashHeader>
      <TabBody>
        <Suspense fallback={<LoadingComponent spinnerSize={LoaderSize.PANEL} />}>
          <Switch>
            <Route path={`${match.url}/tasks`} component={MyDashboardTasksRoot} />
            <Route path={match.url} component={MyDashboardTimelineRoot} />
          </Switch>
        </Suspense>
      </TabBody>
    </DashMain>
  )
}

export default withRouter(UserDashMain)
