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
	const [newDate, setDate ] = useState('');
	const [formatDate, setformatDate ] = useState('');
	const classes = useStyles();

	const selectSpeciality = (e) => { setTypeOfHCP(e.target.value)}
	const selectDate = (e) => { setDate(e.target.value)}
	const handleSubmit = async(e) => {
		let date = new Date(newDate)
		console.log(newDate)
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
				console.log(response)
				let dateChoose = new Date(newDate).toDateString().split(" ")
				setformatDate(`${dateChoose[0]}, ${dateChoose[2]} 
					${new Date(newDate).toLocaleString('default', { month: 'long' })}`)				
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
	const convertTime = (start) => {
		let hours = new Date(start).getHours()
		let min = new Date(start).getMinutes()
		let realMin = min<10?'00':min
		return `${hours}:${realMin}`

	}

	return (
		<div>
			<Search 
				search={handleSubmit} 
				changeSpeciality={selectSpeciality}
				chooseSpeciality={typeOfHCP}
				changeDate={selectDate}
				chooseDate={newDate}/>
            <DoctorFilter/>
			<Box className={classes.dateSearch} >
                <Typography variant="h5" color="textSecondary" component="p">{formatDate}</Typography>
            </Box>
			<Box className={classes.cardCalendar}>
				<Box>
			{doctors.map((el)=> {
				return <DoctorCard 
							key={el._id}
							appointmentId={el._id}
							start={convertTime(el.appointmentTimeStart)}
							end= {convertTime(el.appointmentTimeEnd)}
							image={el.accountHCPid.picture}
							description={el.accountHCPid.description}		
							fullName={el.accountHCPid.fullName}
							price = { el.accountHCPid.price.value}
							currency = {el.accountHCPid.price.currency}
							ratingStars ={el.accountHCPid.rating.averageRating}
							reviews = {el.accountHCPid.rating.receivedRating}
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
