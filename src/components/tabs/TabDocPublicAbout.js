import React from 'react';
import Loader from 'react-loader-spinner';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../groups/ErrorMessage';
//CUSTOM UI
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
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
	},
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	}
});

//QUERY DOCTOR'S PUBLIC INFORMATION ACCORDING TO DOCID

const MYAPPOINTMENTS_QUERY = gql`
	query GetAppointments($id: ID!) {
		doctorProfile(id: $id) {
			_id
			profileInfo
			yearsExperience
			yearsSpecialist
			education
			country
			city
			websiteUrl
		}
	}
`;

const TabDocPublicAbout = ({ docId }) => {
	const classes = useStyles();
	const { t } = useTranslation();
	const { loading, error, data } = useQuery(MYAPPOINTMENTS_QUERY, {
		variables: { id: docId }
	});

	return (
		<Container>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}

			{error && <ErrorMessage />}

			{/* IF DATA */}
			{data && (
				<div>
					<PaperCustomShadow className={classes.paper}>
						<Typography className={classes.sub} variant="subtitle1">
							Profile
						</Typography>
						<Divider className={classes.divider} />
						<Typography color="textSecondary" variant="body2">
							{/* Chuck tenderloin kielbasa, pariatur drumstick pancetta sirloin non ex. Eiusmod leberkas burgdoggen,
					tenderloin tongue shankle qui beef. Swine burgdoggen dolor kevin magna officia quis pancetta anim
					fatback. Laboris tenderloin drumstick, ea filet mignon est turducken officia short ribs nisi pig
					shank flank. Occaecat excepteur velit ball tip. Does your lorem ipsum text long for something a
					little meatier? Give our generator a try… it’s tasty! */}
							{data.doctorProfile.profileInfo}
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
								{data.doctorProfile.websiteUrl}
							</Link>
						</div>
					</PaperCustomShadow>
					<PaperCustomShadow className={classes.paper}>
						<Typography className={classes.sub} variant="subtitle1">
							Experience
						</Typography>
						<Divider className={classes.divider} />
						<Typography color="textSecondary" variant="body2">
							Years of Experience: {data.doctorProfile.yearsExperience}
						</Typography>
						<Typography color="textSecondary" variant="body2">
							Years as Specialist: {data.doctorProfile.yearsSpecialist}
						</Typography>
					</PaperCustomShadow>
					<PaperCustomShadow className={classes.paper}>
						<Typography className={classes.sub} variant="subtitle1">
							Education
						</Typography>
						<Divider className={classes.divider} />
						<Typography color="textSecondary" variant="body2">
							{data.doctorProfile.education}
						</Typography>
					</PaperCustomShadow>
					<PaperCustomShadow className={classes.paper}>
						<Typography className={classes.sub} variant="subtitle1">
							Location
						</Typography>
						<Divider className={classes.divider} />
						<Typography>
							{data.doctorProfile.city} , {data.doctorProfile.country}
						</Typography>
					</PaperCustomShadow>
				</div>
			)}
		</Container>
	);
};

export default TabDocPublicAbout;
