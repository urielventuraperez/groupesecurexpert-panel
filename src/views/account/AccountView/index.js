import React, {useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import {connect} from 'react-redux';
import { me } from 'src/redux/actions/users';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = (props) => {
  const classes = useStyles();

  useEffect(()=>{
    props.me();
  },[props.me])

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile userInfo={props.user} />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.me,
    isLoad: state.users.isLoad
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    me: () => dispatch(me()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
