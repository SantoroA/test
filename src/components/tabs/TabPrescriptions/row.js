import React, {useContext} from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
import { Context as AuthContext } from '../../../context/AuthContext';
import { useQuery, gql, useMutation } from '@apollo/client';
import { PRESCRIPTION_QUERY } from './index';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import GetAppIcon from '@material-ui/icons/GetApp';

const VIEW_MUTATION = gql`
mutation UpdatePrescriptionView($idApt: ID!) {
	patientViewPrescription(idApt: $idApt) 
}
`;

function Row({ value }) {
	const classes = useStyles();
	const { state: { userId } } = useContext(AuthContext);
	const [patientViewPrescription] = useMutation(VIEW_MUTATION, {
		refetchQueries: () => [				{
			  query: PRESCRIPTION_QUERY,
			  variables: {
				idPatient: userId,
				cursor: null,
				limit: 3
			  }}
		  ]
	});
	//PASS IN DOCUMENT LINK
	const { profileHCPid, accountHCPid ,appointmentTimeStart, appointmentTimeEnd, prescription, _id } = value;

	return (
		<PaperCustomShadow className={classes.paper} style={{ backgroundColor: `${prescription.isNew && '#D7FEF1'}` }}>
			<Grid container className={classes.wrapper}>
				<Grid item md={3} sm={4} xs={12}>
					<div className={classes.name}>
						<Avatar className={classes.avatar} alt={profileHCPid.lastName} src={accountHCPid.profilePicture} />
						Dr. {profileHCPid.lastName}
					</div>
				</Grid>
				<Grid item md={2} sm={4} xs={6}>
					{formatDateShort(appointmentTimeStart)}
				</Grid>
				<Grid item md={2} sm={4} xs={6}>
					{convertTime(appointmentTimeStart)} - {convertTime(appointmentTimeEnd)}
				</Grid>
				<Grid item md={3} sm={6} xs={6}>
					{prescription.name}
				</Grid>
				<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
					<Tooltip title="Download Prescription">
						<IconButton href={prescription.document} onClick={() => {
							patientViewPrescription({variables: {idApt: _id}})
						}}>
							<GetAppIcon color="primary" />
						</IconButton>
					</Tooltip>
				</Grid>
			</Grid>
		</PaperCustomShadow>
	);
}
export default Row;
