import React, {PropTypes} from 'react';
import {cashay} from 'cashay';
import {connect} from 'react-redux';
import UnpaidTeamModal from 'universal/modules/teamDashboard/components/UnpaidTeamModal/UnpaidTeamModal';
import {withRouter} from 'react-router';
import portal from 'react-portal-hoc';

const orgDetailsQuery = `
query {
  orgDetails(teamId: $teamId) {
    id
    billingLeaders {
      id
      preferredName
    }
    creditCard {
      brand
    }
    name
  }
}
`;

const mapStateToProps = (state, props) => {
  const {teamId} = props;
  const {orgDetails} = cashay.query(orgDetailsQuery, {
    op: 'unpaidTeamModalContainer',
    key: teamId,
    variables: {
      teamId
    }
  }).data;
  return {
    orgDetails,
    myUserId: state.auth.obj.sub
  };
};

const UnpaidTeamModalContainer = (props) => {
  const {closeAfter, isClosing, router, teamName, orgDetails, myUserId} = props;
  const {creditCard: {brand}, billingLeaders, name: orgName, id: orgId} = orgDetails;
  if (billingLeaders.length === 0) return null;

  const billingLeaderName = billingLeaders[0].preferredName;
  const isALeader = billingLeaders.findIndex((leader) => leader.id === myUserId) !== -1;
  const handleClick = () => router.push(`/me/organizations/${orgId}`);
  const problem = brand ? `The trial for ${teamName} has ended.` : `There in an unpaid invoice for ${teamName}.`;
  const solution = isALeader ? `Head over to ${orgName} Settings to add a payment method` :
    `Try reaching out to ${billingLeaderName}`;

  return (
    <UnpaidTeamModal
      closeAfter={closeAfter}
      isClosing={isClosing}
      problem={problem}
      solution={solution}
      isALeader={isALeader}
      handleClick={handleClick}
    />
  );
};

UnpaidTeamModalContainer.propTypes = {
  router: PropTypes.object,
  orgId: PropTypes.string,
  teamName: PropTypes.string
};

export default portal({closeAfter: 100})(withRouter(connect(mapStateToProps)(UnpaidTeamModalContainer)));
