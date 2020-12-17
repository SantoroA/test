import React, {useState} from 'react';
import dianurseApi from '../../api/dianurseApi';
import Search from '../../components/groups/FormFindDoctor'
import DoctorFilter from '../../components/groups/DoctorFilter'
import DoctorCard from '../../components/groups/DoctorCard'
import Calendar from '../customUi/Calendar'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';


const useStyles = makeStyles({
	dateSearch: {
        padding: '15px',
        width: '43.5rem',
        marginLeft: '12%'
	},
	cardCalendar: {
		display: 'flex',
		flexDirection: 'row',
		width: "75%",
		margin: "auto"
	}
})

const DoctorSearch = () => {
	const [doctors, setDoctors] = useState([]);
	const [typeOfHCP, setTypeOfHCP ] = useState('Cardiologist');
	const [date, setDate ] = useState('');
	const [formatDate, setformatDate ] = useState('');
	const classes = useStyles();

	const selectSpeciality = (e) => { setTypeOfHCP(e.target.value)}
	const selectDate = (e) => { setDate(e.target.value)}
	const handleSubmit = async(e) => {
		const search = {
			typeOfHCP,
			date
		}
		e.preventDefault();
			try {
				const response = await dianurseApi.get('/appointment/searchAppointment', {
					params:search
				})
				setDoctors(response.data)

				let dateChoose = new Date(date).toDateString().split(" ")
				setformatDate(`${dateChoose[0]}, ${dateChoose[2]} 
					${new Date(date).toLocaleString('default', { month: 'long' })}`)				
			} catch (err) {
				console.log(err.message);
			}
	}

	const reserve = async(appointmentId) => {
		let patientId = "5fd0ccfb428d89002a2b5687" // pegar do context
		try {
			const response = await dianurseApi.post(`/appointment/addAppointment/${patientId}`, {
				appointmentId
			})
			console.log(response.data)	
		} catch (err) {
			console.log(err.message);
		}}

	return (
		<div>
			<Search 
				search={handleSubmit} 
				changeSpeciality={selectSpeciality}
				chooseSpeciality={typeOfHCP}
				changeDate={selectDate}
				chooseDate={date}/>
            <DoctorFilter/>
			<Box className={classes.dateSearch} >
                <Typography variant="h5" color="textSecondary" component="p">{formatDate}</Typography>
            </Box>
			<Box className={classes.cardCalendar}>
				<Box>
			{doctors.map((el)=> {
				return <DoctorCard 
							key={el.time._id}
							appointmentId={el.time._id}
							start={el.time.appointmentTimeStart}
							end= {el.time.appointmentTimeEnd}
							image={el.doctor.picture}
							description={el.doctor.description}		
							fullName={el.doctor.fullName}
							price = { el.doctor.price.value}
							currency = {el.doctor.price.currency}
							ratingStars ={el.doctor.rating.averageRating}
							reviews = {el.doctor.rating.receivedRating}
							getAppointment ={
								(e) => {
									e.preventDefault();
									reserve(el.time._id)}
						}/>
			})}
			</Box>
			<Calendar/>
            </Box>
		</div>
	);
};

export default DoctorSearch;
