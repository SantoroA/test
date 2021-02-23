import React from 'react';
import logo from '../../../assets/dianurse-logo.png';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();
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
						<Typography className={classes.title}>{t('PRODUCTS.1')}</Typography>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('THERMS_OF_SERVICE.1')}
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('PRIVACY_POLICY.1')}
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('COOKIE_POLICY.1')}
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('CANCELLATION.1')}
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('SIGN_IN_AS_DOCTOR.1')}
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('MEMBERSHIP.1')}
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('TOOLS.1')}
							</Link>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} sm={6} md={3}>
					<Grid container direction="column">
						<Typography className={classes.title}>{t('COMPANY.1')} </Typography>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('ABOUT_US.1')}
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('DIANURSE_BLOG.1')}
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('CAREERS.1')}
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('CONTACT_US.1')}
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Link href="#" className={classes.link}>
								{t('HELP_CENTER.1')}
							</Link>
						</Grid>
						<Grid item className={classes.services}>
							<Grid container>
								<Typography className={classes.email}>
									{t('EMAIL.1')}
									<a href="mailto:support@dianurse.com" target="_top" className={classes.emailLink}>
										support@dianurse.com
									</a>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} sm={6} md={3}>
					<Grid container direction="column">
						<Typography className={classes.title}>{t('PODCASTS.1')}</Typography>
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
						<Typography variant="body2">{t('FOOTER_DESC.1')}</Typography>
					</Grid>
				</Grid>
			</Grid>
		</footer>
	);
};
export default Footer;
