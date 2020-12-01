import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import logo from "../../assets/dianurse-logo.png";
import { Context as AuthContext } from "../../context/AuthContext";
import Rating from "@material-ui/lab/Rating";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Link from "@material-ui/core/Link";
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  navbar: {
    flexGrow: 1,
    backgroundColor: "#fff",
    color: "#000",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  iconButton: {
    display: "flex",
    color: "#808080",
    marginLeft: 0,
    justifyContent: "flex-end",
    float: "right",
  },
  img: {
    width: "8.5em",
    height: "1.3em",
    paddingInlineStart: "1em",
  },
  loginName: {
    color: "#000",
    marginLeft: "0.5em",
  },
  menu: {
    marginTop: "3em",
  },
  body: {
    display: "flex",
    textAlign: "center",
    fontWeight: "600",
    backgroundColor: "#d8eaf4",
    marginTop: "1.5em",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    justifyContent: "center",
    marginTop: "2em",
    marginBottom: "1em",
  },
  avatar: {
    marginRight: "1em",
    marginTop: "3.5em",
  },
  price: {
    color: "#fff",
    backgroundColor: "#166cbc",
    marginRight: "0",
  },
  first_block: {
    display: "flex",
    flexDirection: "row",
  },
  second_block: {
    margin: theme.spacing(8, 0, 8, 20),
  },
  rating: {
    display: "flex",
    flexDirection: "row",
  },
  links: {
    textAlign: "center",
    color: "#000",
    margin: "1.5em",
    fontWeight: 500,
    textDecoration: "underline",
    fontSize: "1.5em",
  },
  icons: {
    color: "#6c6c5a", 
    marginRight: "0.3em",
    marginLeft: "1em",
  }
}));

const DoctorDashboardPage = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {
    state: { userName },
  } = useContext(AuthContext);
  console.log(userName);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    props.history.push("/getstarted/json");
  };

  return (
    <div>
      <AppBar className={classes.navbar} position="static">
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="Logo" className={classes.img} />
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className={classes.iconButton}
            >
              <AccountCircle fontSize="large" />
              <Typography variant="h6" className={classes.loginName}>
                Doctor's Name: {userName}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              className={classes.menu}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile Settings</MenuItem>
              <MenuItem onClick={handleClose}>Past Appointments</MenuItem>
              <MenuItem onClick={handleClose}>Membership</MenuItem>
              <MenuItem onClick={handleClose}>Help</MenuItem>
              <MenuItem type="button" onClick={handleLogout} value="Logout">
                Logout
              </MenuItem>
            </Menu>
          </>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        <div className={classes.first_block}>
          <Avatar className={classes.avatar} />
          {/* fetch the foto as url- it's received from the back-end  */}
          {/* get data request and display the response from the back-end on the page */}
          <Typography variant="h4" className={classes.text}>
            Doctor's Name: {userName}
            <Typography className={classes.text} variant="h6">
              Add your specialty:
            </Typography>
          </Typography>
        </div>
        <div className={classes.second_block}>
          {/* to be dynamic later, the doc should click on reviews */}
          <div className={classes.rating}>
            <Rating name="read-only" value={0} readOnly />
            <Typography variant="subtitle1">(0 reviews)</Typography>
          </div>
          <Typography variant="subtitle1" className={classes.price}>
            <p>
              Price from <br></br>
              <b>LV 00.00</b>
            </p>
          </Typography>
          {/* how it works with the status, to be added */}
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Private profile"
            />
          </FormGroup>
        </div>
      </div>
      <div style={ {textAlign: "center"} }>
      <Link
          component="button"
          variant="body2"
          className={classes.links}
        > <VideocamOutlinedIcon className={classes.icons} />
          My Appointments
        </Link>
        <Link
          component="button"
          variant="body2"
          className={classes.links}
        > <PeopleAltOutlinedIcon className={classes.icons} />
          My Patients
        </Link>
        <Link
          component="button"
          variant="body2"
          className={classes.links}
        > <AccountBalanceWalletOutlinedIcon className={classes.icons} />
          My Earnings 
        </Link>
        <Link
          component="button"
          variant="body2"
          className={classes.links}
        > <EventAvailableOutlinedIcon className={classes.icons} />
          Availability
        </Link>
        </div>
    </div>
  );
};

export default DoctorDashboardPage;