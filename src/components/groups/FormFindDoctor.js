import React, { useState } from 'react';
import TextInput from '../../components/customUi/TextInput';
import ButtonIcon from '../../components/customUi/ButtonIcon'
//MATERIAL UI
//GRID ?
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
	formControl: {
        width: '40rem' ,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ButtonIcon: {
        borderRadius: 50 
    },

});
const SearchDoctor = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [speciality, setSpeciality ] = useState('');
    const classes = useStyles();
	
	return (
	<div >
        <FormControl className={classes.formControl} onSubmit={() => {console.log(speciality, selectedDate)}}>
            <TextInput
                id="Speciality"
                label="Speciality"
                select
                variant = 'outlined'
                style= {{ // eliminate when we have the right style
                    width: 300
                }}
                value={speciality}
				onChange={(e) => setSpeciality(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}>   
                <option value={'Cardiologist'} >Cardiologist</option> 
                <option value={'Endocrinologist'}>Endocrinologist</option>
                <option value={'Diestist'}>Dietist</option>
            </TextInput> 
            <TextInput
                id="date"
                label="Date"
		        type="date"
                variant = 'outlined'
                value={selectedDate}
				onChange={(e) => setSelectedDate(e.target.value)}
		        defaultValue= {selectedDate} // today day?
                InputLabelProps={{
                    shrink: true,
                }} />
		    <ButtonIcon type='submit'>
                <SearchIcon/>
            </ButtonIcon>
        </FormControl>
	</div>
	);
};

export default SearchDoctor;




