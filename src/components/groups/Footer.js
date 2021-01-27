import React from 'react';
import logo from '../../assets/dianurse-logo.png';
//CUSTOM ICON
import InstagramIcon from '../customIcons/InstagramIcon';
import PinterestIcon from '../customIcons/PinterestIcon';
import FacebookIcon from '../customIcons/FacebookIcon';
import TwitterIcon from '../customIcons/TwitterIcon';
import LinkedinIcon from '../customIcons/LinkedinIcon';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
//ICONS

const useStyles = makeStyles({
	footer: {
		backgroundColor: '#F6F8FB',
		marginTop: 'calc(5%)',
		bottom: '0',
		padding: '2rem'
	},
	img: {
		width: '150px',
		marginBottom: '1rem'
	},

	iconGrid: {
		display: 'flex',
		width: '150px',
		justifyContent: 'space-between'
	},
	icon: {
		color: '#52575C',
		'&:hover': {
			color: '#07B597'
		}
	},

	textFooter: {
		display: 'flex',
		textAlign: 'center',
		marginBottom: '1rem',
		marginTop: '1rem'
	},
	title: {
		fontWeight: 'bold',
		color: '#52575C',
		marginBottom: '1rem'
	},
	link: {
		color: '#52575C',
		fontWeight: 'normal',
		textDecoration: 'none ',
		'&:hover': {
			color: '#07B597',
			textDecoration: 'none'
		}
	},
	services: {
		marginBottom: '1rem'
	},
	email: {
		color: '#52575C',
		fontWeight: 'normal',
		'&>a': {
			color: '#07B597',
			textDecoration: 'none '
		}
	},
	emailLink: {
		paddingLeft: '0.3rem'
	},
	columnOne: {
		flexDirection: 'column',
		justifyContent: 'center',
		paddingBottom: '1rem'
	}
});

const Footer = () => {
	const classes = useStyles();
	return (
		<footer className={classes.footer}>
			<Grid container>
				<Grid item xs={12} sm={6} md={3}>
					<Grid container className={classes.columnOne}>
						<Grid item>
							<Link href="#">
								<img src={logo} alt="Logo" className={classes.img} />
							</Link>
						</Grid>
						<Grid item className={classes.iconGrid}>
							<Link href="#">
								<FacebookIcon className={classes.icon} />
							</Link>
							<Link href="#">
								<TwitterIcon className={classes.icon} />
							</Link>
							<Link href="#">
								<InstagramIcon className={classes.icon} />
							</Link>
							<Link href="#">
								<PinterestIcon className={classes.icon} />
							</Link>
							<Link href="#">
								<LinkedinIcon className={classes.icon} />
							</Link>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Grid container direction="column">
						<Typography className={classes.title}>COMPANY</Typography>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Terms of Service
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Privacy Policy
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Cookie Policy
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Cancellation & Refund Policy
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Sign in as Doctor
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Membership
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Tools
							</Link>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} sm={6} md={3}>
					<Grid container direction="column">
						<Typography className={classes.title}>PODCASTS</Typography>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								About Us
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Dianurse Blog
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Careers
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Contact Us
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Help Center & FAQs
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Grid container>
								<Typography className={classes.email}>
									Email:<a
										href="mailto:support@dianurse.com"
										target="_top"
										className={classes.emailLink}
									>
										support@dianurse.com
									</a>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} sm={6} md={3}>
					<Grid container direction="column">
						<Typography className={classes.title}>PRODUCTS</Typography>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Apple
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Breaker
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Google
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								Spotify
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								RadioPublic
							</Link>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={10} sm={11} className={classes.textFooter}>
					<Grid container>
						<Typography variant="body2">
							The telemedicine services made available through Dianurse are provided by licensed
							physicians practicing within a group of independently owned professional practices
							collectively known as “Dianurse Professionals”. These professional practices provide
							services via the Dianurse telehealth platform. Dianurse does not itself provide any
							physician, mental health or other healthcare provider services.
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</footer>
	);
};
export default Footer;
