import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { formatDateDisplay, formatFormDate } from '../../helpers/dateHelper';
import Loader from 'react-loader-spinner';

import { useQuery, gql } from '@apollo/client';

import { useTranslation } from 'react-i18next';
import ErrorMessage from '../groups/ErrorMessage';
//CUSTOM UI
import CalendarApp from '../customUi/CalendarApp';
import PaperCustomShadow from '../customUi/PaperCustomShadow';

//MATERIAL UI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	paper: {
		padding: '1rem',
		marginBottom: '1rem'
	},
	sub: {
		fontWeight: 'bold'
	},
	divider: {
		marginBottom: '1rem',
		marginTop: '1rem'
	},
	linkWrapper: {
		textAlign: 'center'
	},
	link: {
		fontWeight: 'bold'
	}
});

//QUERY DOCTOR'S PUBLIC INFORMATION ACCORDING TO DOCID

const TabDocPublicAbout = ({ docId }) => {
	const classes = useStyles();
	const { t, i18n } = useTranslation();
	// const { loading, error, data } = useQuery(MYAPPOINTMENTS_QUERY, {
	// 	variables: {  id: docId }
	// });

	return (
		<Container container>
			{/* {loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}

			{error && <ErrorMessage />} */}

			{/* IF DATA */}
			<PaperCustomShadow className={classes.paper}>
				<Typography className={classes.sub} variant="subtitle1">
					Profile
				</Typography>
				<Divider className={classes.divider} />
				<Typography color="textSecondary" variant="body2">
					Chuck tenderloin kielbasa, pariatur drumstick pancetta sirloin non ex. Eiusmod leberkas burgdoggen,
					tenderloin tongue shankle qui beef. Swine burgdoggen dolor kevin magna officia quis pancetta anim
					fatback. Laboris tenderloin drumstick, ea filet mignon est turducken officia short ribs nisi pig
					shank flank. Occaecat excepteur velit ball tip. Does your lorem ipsum text long for something a
					little meatier? Give our generator a try… it’s tasty!
				</Typography>
				<Divider className={classes.divider} />
				<div className={classes.linkWrapper}>
					<Link
						className={classes.link}
						href="#"
						onClick={(e) => e.preventDefault}
						color="inherit"
						variant="body2"
					>
						www.doctorLink.com
					</Link>
				</div>
			</PaperCustomShadow>
			<PaperCustomShadow className={classes.paper}>
				<Typography className={classes.sub} variant="subtitle1">
					Experience
				</Typography>
				<Divider className={classes.divider} />
				<Typography color="textSecondary" variant="body2">
					Years of Experience: 5
				</Typography>
				<Typography color="textSecondary" variant="body2">
					Years as Specialist: 5
				</Typography>
			</PaperCustomShadow>
			<PaperCustomShadow className={classes.paper}>
				<Typography className={classes.sub} variant="subtitle1">
					Education
				</Typography>
				<Divider className={classes.divider} />
				<Typography color="textSecondary" variant="body2">
					Chuck tenderloin kielbasa, pariatur drumstick pancetta sirloin non ex. Eiusmod leberkas burgdoggen,
					tenderloin tongue shankle qui beef. Swine burgdoggen dolor kevin magna officia quis pancetta anim
					fatback. Laboris tenderloin drumstick, ea filet mignon est turducken officia short ribs nisi pig
					shank flank. Occaecat excepteur velit ball tip. Does your lorem ipsum text long for something a
					little meatier? Give our generator a try… it’s tasty!
				</Typography>
			</PaperCustomShadow>
			<PaperCustomShadow className={classes.paper}>
				<Typography className={classes.sub} variant="subtitle1">
					Location
				</Typography>
				<Divider className={classes.divider} />
			</PaperCustomShadow>
		</Container>
	);
};
// message de erro
export default TabDocPublicAbout;
