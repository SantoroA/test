import React from 'react';
import logo from '../../../assets/dianurse-logo.png';
import useStyles from './style';
//CUSTOM ICON
import InstagramIcon from '../../customIcons/InstagramIcon';
import PinterestIcon from '../../customIcons/PinterestIcon';
import FacebookIcon from '../../customIcons/FacebookIcon';
import TwitterIcon from '../../customIcons/TwitterIcon';
import LinkedinIcon from '../../customIcons/LinkedinIcon';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
//ICONS

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
				<Grid item xs={12} className={classes.textFooter}>
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
