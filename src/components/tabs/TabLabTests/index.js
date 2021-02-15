import React, { useState } from 'react';
import useStyles from './style';
import EmptyLabTestState from './emptyState';
import Row from './row';
import { useTranslation } from 'react-i18next';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
import ButtonFilled from '../../customUi/ButtonFilled';
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
import PublishIcon from '@material-ui/icons/Publish';

const tests = [
	{
		docName: 'Gabi',
		start: '2021-02-10T09:30:00.000Z',
		end: '2021-02-10T09:30:00.000Z',
		patComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/3053844/pexels-photo-3053844.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		id: 'sfwefwefadaawef'
	},
	{
		docName: 'Aline',
		start: '2021-02-10T08:30:00.000Z',
		end: '2021-02-10T08:30:00.000Z',
		patComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/3136340/pexels-photo-3136340.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		id: 'sfwefasdaswefawef'
	},
	{
		docName: 'Peach',
		start: '2021-02-10T07:00:00.000Z',
		end: '2021-02-10T07:30:00.000Z',
		patComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		id: 'sfwefweaadfeffawef'
	},
	{
		docName: 'Pear',
		start: '2021-02-05T07:00:00.000Z',
		end: '2021-02-05T07:30:00.000Z',
		patComments: '',
		docStatus: '',
		docPic:
			'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		id: 'sfwefwfvfdefawef'
	}
];

const TabLabTests = () => {
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const classes = useStyles();
	const { t , i18n} = useTranslation();
	return (
		<Grid className={classes.root} container>
			<Grid item className={classes.header}>
				<Typography className={classes.title} variant="h5">
				{t("LAB_TESTS.1")}
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
							<TableCell className={classes.tableHeader}>{t("Doctor_Name.1")}</TableCell>
							<TableCell className={classes.tableHeader}>{t("Date.1")}</TableCell>
							<TableCell className={classes.tableHeader}>{t("Appointment_Time.1")}</TableCell>
							<TableCell className={classes.tableHeader}>{t("Document_Status.1")}</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? tests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: tests).map((test) => {
							return <Row value={test} key={test.id} />;
						})}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 20 ]}
					page={page}
					onChangePage={(e, newPage) => setPage(newPage)}
					rowsPerPage={rowsPerPage}
					component="div"
					count={tests.length}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</TableContainer>

			{/* IF NO DATA */}
			<EmptyLabTestState />
		</Grid>
	);
};

export default TabLabTests;
