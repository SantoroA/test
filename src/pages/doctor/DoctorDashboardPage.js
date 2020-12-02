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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";

// theming
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
  menu_style: {
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
  },
  wrapperTab: {
    textTransform: "capitalize",
    fontSize: "1.2em",
  },
  icons: {
    color: "#6c6c5a",
    marginRight: "0.3em",
    marginLeft: "1em",
  },
}));

const DoctorDashboardPage = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedPublic: false,
    checkedPrivate: true,
  });
  const [value, setValue] = React.useState(0);
  const [menu, setMenu] = React.useState(null);
  const open = Boolean(menu);
  const {
    state: { userName },
  } = useContext(AuthContext);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = (event) => {
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
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
                {userName}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              className={classes.menu_style}
              anchorEl={menu}
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
              <MenuItem onClick={handleClose}>Logout</MenuItem>
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
            {userName}
            <Typography className={classes.text} variant="h6">
              Specialty:
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
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedPublic}
                  onChange={handleChange}
                  name="checkedPublic"
                  color="primary"
                />
              }
              label="Private profile"
            />
          </FormGroup>
        </div>
      </div>
      <div>
        <Tabs
          value={value}
          onChange={handleChangeValue}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="#000"
          aria-label="icon label tabs"
          flexDirection= "row"
        >
          <Tab
            className={classes.wrapperTab}
            icon={<VideocamOutlinedIcon className={classes.icons} />}
            label="My Appointments"
          />
          <Tab
            className={classes.wrapperTab}
            icon={<PeopleAltOutlinedIcon className={classes.icons} />}
            label="My Patients"
          />
          <Tab
            className={classes.wrapperTab}
            icon={
              <AccountBalanceWalletOutlinedIcon className={classes.icons} />
            }
            label="My Earnings"
          />
          <Tab
            className={classes.wrapperTab}
            icon={<EventAvailableOutlinedIcon className={classes.icons} />}
            label="Availability"
          />
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
