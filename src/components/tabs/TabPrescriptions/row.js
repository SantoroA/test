import React from 'react';
import useStyles from './style';
import { formatDateShort, convertTime } from '../../../helpers/dateHelper';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import GetAppIcon from '@material-ui/icons/GetApp';

function Row({ value }) {
	const classes = useStyles();
	//PASS IN DOCUMENT LINK
	const { docName, start, end, prescName, id, docPic, isNew } = value;

	return (
		<PaperCustomShadow className={classes.paper} style={{ backgroundColor: `${isNew && '#D7FEF1'}` }}>
			<Grid container className={classes.wrapper}>
				<Grid item md={3} sm={4} xs={12}>
					<div className={classes.name}>
						<Avatar className={classes.avatar} alt={docName} src={docPic} />
						Dr. {docName}
					</div>
				</Grid>
				<Grid item md={2} sm={4} xs={6}>
					{formatDateShort(start)}
				</Grid>
				<Grid item md={2} sm={4} xs={6}>
					{convertTime(start)} - {convertTime(end)}
				</Grid>
				<Grid item md={3} sm={6} xs={6}>
					{prescName}
				</Grid>
				<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
					<Tooltip title="Download Prescription">
						<IconButton>
							<GetAppIcon color="primary" />
						</IconButton>
					</Tooltip>
				</Grid>
			</Grid>
		</PaperCustomShadow>
	);
}
export default Row;
