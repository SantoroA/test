import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Context as AuthContext } from "../../context/AuthContext";
import Rating from "@material-ui/lab/Rating";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// theming
const useStyles = makeStyles((theme) => ({
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
  }
}));

const MainInfo = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedPublic: false,
    checkedPrivate: true,
  });
  const [menu, setMenu] = React.useState(null);
  const open = Boolean(menu);
  const {
    state: { userName },
  } = useContext(AuthContext);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
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
                  checked={state.checkedPrivate}
                  onChange={handleChange}
                  name="checkedPrivate"
                  color="primary"
                />
              }
              label="Private profile"
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;