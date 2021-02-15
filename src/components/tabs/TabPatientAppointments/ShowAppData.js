import React from 'react';
import CardAppointment from '../../groups/CardAppointment';


const ShowAppData = ({ appointments, setDialogAppDetailOpen, setAppointmentToView }) => {
	console.log(appointments);
	
	return appointments.map((apt) => {
		
		return (
			<CardAppointment
				onSubmit={() => {
					setDialogAppDetailOpen(true);
					setAppointmentToView(apt);
				}}
				key={apt._id}
				showPrice={true}
				state={{
					appointment: {
						amount: apt.amount,
						end: apt.appointmentTimeEnd,
						id: apt.profilePatientid._id,
						idApt: apt._id,
						start: apt.appointmentTimeStart
					},
					name: 'Doctor Fulano',
					pic:
						'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
					// apt.accountPatientid.profilePicture
					buttonText: 'View',
					title: "Doctor"
				}}
			/>
		);
	});
};

export default ShowAppData;
