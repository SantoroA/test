import React, {useState} from 'react';
import Search from '../../components/groups/FormFindDoctor'
import DoctorFilter from '../../components/groups/DoctorFilter'
import DoctorCard from '../../components/groups/DoctorCard'
import dianurseApi from '../../api/dianurseApi';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles({
	dateSearch: {
        padding: '10px',
        width: '43.5rem',
        margin: 'auto'
    }
})

const DoctorSearch = () => {
	const [doctors, setDoctors] = useState([]);
	const [typeOfHCP, setTypeOfHCP ] = useState('Cardiologist');
	const [date, setDate ] = useState('');
	const [appointment, setAppointment ] = useState('');
	const classes = useStyles();

	// functions
	const selectSpeciality = (e) => { setTypeOfHCP(e.target.value)}
	const selectDate = (e) => { setDate(e.target.value)}
	const handleSubmit = async(e) => {
		console.log(typeOfHCP, date)
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
				console.log(response.data)
				
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
		}
		console.log('clicked')
	}

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
                <Typography variant="h5" color="textSecondary" component="p">Mon, 30 September</Typography>
            </Box>
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
									reserve(el.time._id)
								}
						}
							/>
			})}
            
		</div>
	);
};

export default DoctorSearch;
