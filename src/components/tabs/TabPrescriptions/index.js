import React, { useState } from 'react';
import useStyles from './style';
import EmptyPrescState from './emptyState';
import Row from './row';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../groups/ErrorMessage';
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
		prescName: 'Prescription for Liver Disease',
		docPic:
			'https://images.pexels.com/photos/3053844/pexels-photo-3053844.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		id: 'sfwefwefadaawef',
		isNew: true
	},
	{
		docName: 'Aline',
		start: '2021-02-10T08:30:00.000Z',
		end: '2021-02-10T08:30:00.000Z',
		prescName: 'Acne medication',
		docPic:
			'https://images.pexels.com/photos/3136340/pexels-photo-3136340.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		id: 'sfwefasdaswefawef',
		isNew: false
	},
	{
		docName: 'Peach',
		start: '2021-02-10T07:00:00.000Z',
		end: '2021-02-10T07:30:00.000Z',
		prescName: 'Muscle relaxer',
		docPic:
			'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		id: 'sfwefweaadfeffawef',
		isNew: false
	},
	{
		docName: 'Pear',
		start: '2021-02-05T07:00:00.000Z',
		end: '2021-02-05T07:30:00.000Z',
		prescName: 'Lamitrigine',
		docPic:
			'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		id: 'sfwefwfvfdefawef',
		isNew: false
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
	const { t } = useTranslation();
	return (
		<Grid className={classes.root} container>
			<Grid item className={classes.header}>
				<Typography className={classes.title} variant="h5">
					{t('PRESCRIPTIONS.1')}
				</Typography>
			</Grid>
			{/* {loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)} */}
			{/* {error && <ErrorMessage />} */}

			{/* IF DATA */}

			{prescriptions.map((presc) => {
				return <Row value={presc} key={presc.id} />;
			})}

			{/* IF NO DATA */}
			<EmptyPrescState />
		</Grid>
	);
};

export default TabPrescriptions;
