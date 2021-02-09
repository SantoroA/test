import React, { useState } from 'react';
import useStyles from './style';
import EmptyPrescState from './emptyState';
import Row from './row';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const prescriptions = [
	{
		docName: 'Gabi',
		start: '2021-02-10T09:30:00.000Z',
		end: '2021-02-10T09:30:00.000Z',
		docComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/3053844/pexels-photo-3053844.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		id: 'sfwefwefadaawef'
	},
	{
		docName: 'Aline',
		start: '2021-02-10T08:30:00.000Z',
		end: '2021-02-10T08:30:00.000Z',
		docComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/3136340/pexels-photo-3136340.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		id: 'sfwefasdaswefawef'
	},
	{
		docName: 'Peach',
		start: '2021-02-10T07:00:00.000Z',
		end: '2021-02-10T07:30:00.000Z',
		docComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		id: 'sfwefweaadfeffawef'
	},
	{
		docName: 'Pear',
		start: '2021-02-05T07:00:00.000Z',
		end: '2021-02-05T07:30:00.000Z',
		docComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		id: 'sfwefwfvfdefawef'
	}
];

const TabPrescriptions = () => {
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const classes = useStyles();
	return (
		<Grid className={classes.root} container>
			<Grid item className={classes.header}>
				<Typography className={classes.title} variant="h5">
					Prescriptions
				</Typography>
			</Grid>
			{/* {loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)} */}
			{/* {error && (
				<Container className={classes.emptyState}>
					<Typography color="textSecondary" variant="h4">
						Something went wrong, please try again later
					</Typography>
				</Container>
			)} */}

			{/* IF DATA */}

			<TableContainer className={classes.section} component={PaperCustomShadow}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableHeader}>Doctor Name</TableCell>
							<TableCell className={classes.tableHeader}>Date</TableCell>
							<TableCell className={classes.tableHeader}>Appointment Time</TableCell>
							<TableCell className={classes.tableHeader}>Doctor comments</TableCell>
							<TableCell className={classes.tableHeader}>Doctument Status</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? prescriptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: prescriptions).map((presc) => {
							return <Row value={presc} key={presc.id} />;
						})}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 20 ]}
					page={page}
					onChangePage={(e, newPage) => setPage(newPage)}
					rowsPerPage={rowsPerPage}
					component="div"
					count={prescriptions.length}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</TableContainer>

			{/* IF NO DATA */}
			<EmptyPrescState />
		</Grid>
	);
};

export default TabPrescriptions;
