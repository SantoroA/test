import React, { useState } from 'react';
import useStyles from './style';
import Row from './row';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

const PatientTable = ({ tableTitles, data, buttonText }) => {
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

export default PatientTable;
