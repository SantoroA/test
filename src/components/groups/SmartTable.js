import React, { useState } from 'react';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
//CUSTOM UI
import PaperCustomShadow from '../customUi/PaperCustomShadow';
import ButtonFilled from '../customUi/ButtonFilled';
//MATERIAL UI
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
	name: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: '1rem'
	},
	amount: {
		fontWeight: 'bold',
		color: 'rgba(82, 87, 92, 1)'
	}
});

function Row({ value, buttonText }) {
	const classes = useStyles();
	const { profilePatientid, start, reasonForVisit, end, amount, idApt } = value;

	return (
		<TableRow>
			<TableCell align="left" className={classes.name}>
				<Avatar
					className={classes.avatar}
					alt={profilePatientid.lastName}
					src={profilePatientid.profilePicture}
				/>
				{profilePatientid.firstName} {profilePatientid.lastName}
			</TableCell>
			<TableCell>{formatDateShort(start)}</TableCell>
			<TableCell>
				{convertTime(start)} - {convertTime(end)}
			</TableCell>
			<TableCell>{reasonForVisit}</TableCell>
			<TableCell className={classes.amount}>{amount}</TableCell>
			<TableCell align="left">
				<ButtonFilled>{buttonText}</ButtonFilled>
			</TableCell>
		</TableRow>
	);
}

const SmartTable = ({ tableTitles, data, buttonText }) => {
	const classes = useStyles();
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer component={PaperCustomShadow}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{tableTitles.map(({ name }) => {
							return <TableCell key={name}>{name}</TableCell>;
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: data).map((patient) => {
						return <Row value={patient} key={patient.idApt} buttonText={buttonText} />;
					})}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[ 5, 10, 20 ]}
				page={page}
				onChangePage={(e, newPage) => setPage(newPage)}
				rowsPerPage={rowsPerPage}
				component="div"
				count={data.length}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
};

export default SmartTable;
