import React, { useState } from 'react';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';
import { useLocation, useHistory } from 'react-router-dom';
import CardProfilePublic from '../../components/groups/CardProfilePublic';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import TabDocPublicGeneral from '../../components/tabs/TabDocPublicGeneral';
import TabDocPublicAbout from '../../components/tabs/TabDocPublicAbout';
//CUSTOM UI
import ButtonFilled from '../../components/customUi/ButtonFilled';
import TabCustom from '../../components/customUi/TabCustom';
//CUSTOM ICONS
import InfoIcon from '../../components/customIcons/InfoIcon';
import AboutIcon from '../../components/customIcons/AboutIcon';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
	backButton: {
		textTransform: 'none',
		display: 'flex',
		flexDirection: 'row',
		color: '#07B597',
		marginTop: '2rem',
		marginBottom: '1rem',
		alignSelf: 'flex-start'
	},
	userInfo: {
		justifyContent: 'center',
		padding: '2rem'
	},
	cardContainer: {
		paddingRight: '2rem',
		marginBottom: '1rem'
	},

	root: {
		display: 'flex',
		flexDirection: 'column',

		height: '12rem',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)'
	},
	button: {
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column',
		marginRight: '1rem',
		marginLeft: '1rem'
	},
	switchWrapper: {
		marginTop: '1rem'
	},
	reviewWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: '1rem'
	},
	wrapperTab: {
		textTransform: 'capitalize',
		fontSize: '1.2rem'
	},
	icons: {
		fontSize: '2.3rem'
	}
});

//TAB PANEL
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`wrapped-tabpanel-${index}`}
			aria-labelledby={`wrapped-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

const PatViewDocPublicProfile = () => {
	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();
	const { t } = useTranslation();
	const { id, rating, description, firstname, lastname, minPrice, image } = location.state;
	const [ value, setValue ] = useState(0);
	console.log(rating)
	return (
		<PatLayoutContainer>
			<Button onClick={() => history.goBack()} className={classes.backButton}>
				<ArrowBackIcon />
				<Typography>Back to search</Typography>
			</Button>
			<Grid container className={classes.userInfo}>
				<Grid className={classes.cardContainer} item lg={5} md={8} xs={12}>
					<CardProfilePublic
						firstName={firstname}
						lastName={lastname}
						isHCP={true}
						image={image}
						specialty={description}
					/>
				</Grid>
				<Grid item lg={3} md={4} xs={12} className={classes.userOptions}>
					<Paper elevation={0} className={classes.root}>
						<div className={classes.reviewWrapper}>
							<Rating name="read-only" value={rating.averageRating} readOnly />
							<Typography color="textSecondary" variant="body2">
								({rating.receivedRating} {t('Reviews.1')})
							</Typography>
						</div>

						<ButtonFilled>
							<div className={classes.button}>
								<Typography variant="body1" className={classes.price}>
									{t('Price_from.1')}
								</Typography>
								<Typography variant="h5">LV {minPrice}.00</Typography>
							</div>
						</ButtonFilled>
					</Paper>
				</Grid>
			</Grid>
			<Container>
				<Tabs
					value={value}
					onChange={(e, newValue) => setValue(newValue)}
					variant="fullWidth"
					indicatorColor="primary"
					aria-label="icon label tabs"
				>
					<TabCustom
						className={classes.wrapperTab}
						icon={<InfoIcon className={classes.icons} />}
						label="General Information"
						{...a11yProps(0)}
					/>
					<TabCustom
						className={classes.wrapperTab}
						icon={<AboutIcon className={classes.icons} />}
						label="About Me"
						{...a11yProps(1)}
					/>
				</Tabs>
				<TabPanel value={value} index={0}>
					<TabDocPublicGeneral disableBooking={false} docId={id} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<TabDocPublicAbout docId={id} />
				</TabPanel>
			</Container>
		</PatLayoutContainer>
	);
};

export default PatViewDocPublicProfile;
