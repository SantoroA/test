import React from "react";
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import logo from "../assets/dianurse-logo.png";
import "../index.css";
import axios from 'axios';

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
    backgroundColor: "#beeafd",
    marginTop: "1.5em",
    justifyContent: "center",
  },
  text: {
    display: "block",
    justifyContent: "center",
    marginTop: "2em",
    marginBottom: "2em",
  },
  avatar: {
    display: "inline-block",
    marginTop: "3.5em"
  },
}));


class DocLogin extends React.Component {
  state = {
    name: '',
    description: '',
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
    this.setState({ description: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const HCP = {
      name: this.state.name,
      description: this.state.description
    };

    axios.post(`https://localhost:3000/`, { HCP })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
          <span>
            <input type="text" name="name" onChange={this.handleChange} />
          </span>
      </div>
    )
  }
}

const DashboardPage = () => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar className={classes.navbar} position="static">
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="Logo" className={classes.img} />
          {auth && (
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
                  Michael Goldman
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
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
      <Avatar href="#" className={classes.avatar}></Avatar>
      {/* fetch the foto as url- it's received from the back-end  */}
      {/* get data request and display the response from the back-end on the page */}
        <Typography variant="h4" className={classes.text} onChange={DocLogin.name}>
         Michael Goldman
          <Typography variant="h6" className={classes.text} onChange={DocLogin.description}>
            Specialist in internal medicine and cardiology
          </Typography>
        </Typography>
      </div>
    </div>
  );
};

export default DashboardPage;
