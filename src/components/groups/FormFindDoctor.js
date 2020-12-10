import React from 'react';
//MATERIAL UI

import TextInput from '../../components/customUi/TextInput';
import ButtonFilled from '../../components/customUi/ButtonFilled'
import Dropdown from '../../components/customUi/Dropdown'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    content: {
    backgroundColor: '#C4C4C4',
    height: 100,
    }, 
	formControl: {
        width: '40rem' ,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
	},

});
const SearchDoctor = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const classes = useStyles();
	
	return (
		<div className={classes.content}>
            <FormControl className={classes.formControl}>
<InputLabel shrink htmlFor="speciality">speciality</InputLabel>
<Dropdown
				native
				label="Speciality"
				variant = 'outlined'
				// value={state.age}
				// onChange={handleChange}
				name="Speciality"
				inputProps={{
					id: 'speciality',
				}}>

          <option value={'Cardiologist'}>Cardiologist</option> 
          <option value={'Endocrinologist'}>Endocrinologist</option>
          <option value={'Diestist'}>Dietist</option>

			</Dropdown>
			<TextInput
        id="date"
        label="Date"
		type="date"
		variant = 'outlined'
		defaultValue= {selectedDate} // today day?
        InputLabelProps={{
        shrink: true,
        }}
			/>
			<ButtonFilled>Search</ButtonFilled>
            </FormControl>
            {/* <FormControl className={classes.input}>
			<TextInput
         id="time"
		 label="Select Desired Time"
		 type="time"
		 defaultValue="07:30"
		 variant = 'outlined'
		className={classes.textField}
		 InputLabelProps={{
		   shrink: true,
		 }}
		 inputProps={{
		   step: 3000, // 30 min
		 }}
			/>
</FormControl>
<FormControl className={classes.input}>
		<Dropdown
				native
				// value={state.age}
				// onChange={handleChange}
				variant = 'outlined'
				label="Price"
				inputProps={{
				  name: 'age',
				  id: 'outlined-age-native-simple',
				}}>
  		<option aria-label="None" value="" />
          <option value={10}>10</option> 
          <option value={20}>20</option>
          <option value={30}>30</option>

			</Dropdown>
         </FormControl >
         <FormControl className={classes.input}>
			<Dropdown
				native
				// value={state.age}
				// onChange={handleChange}
				label="Review"
				variant = 'outlined'
				inputProps={{
				  name: 'Review',
				  id: 'outlined-age-native-simple',
				}}>
  		<option aria-label="None" value="" />
          <option value={10}>10</option> 
          <option value={20}>20</option>
          <option value={30}>30</option>

			</Dropdown>
            </FormControl >
            <FormControl className={classes.input}>
			<Dropdown
				native
				// value={state.age}
				// onChange={handleChange}
				label="More filter"
				variant = 'outlined'
				inputProps={{
				  name: 'More filter',
				  id: 'outlined-age-native-simple',
				}}>
  		<option aria-label="None" value="" />
          <option value={10}>10</option> 
          <option value={20}>20</option>
          <option value={30}>30</option>

			</Dropdown>
            </FormControl > */}

		</div>
	);
};

export default SearchDoctor;




