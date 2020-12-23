import React from 'react';
import TextInput from '../../components/customUi/TextInput';
import ButtonIcon from '../../components/customUi/ButtonIcon';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
	formControl: {
		width: '40rem',
		margin: 'auto',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	ButtonIcon: {
		borderRadius: 50
	}
});
const SearchDoctor = (props) => {
    const classes = useStyles();
	
	return (
	<div >
        <form className={classes.formControl} onSubmit={props.search}>
            <TextInput
                id="Speciality"
                label="Speciality"
                select
                variant = 'outlined'
                style= {{ 
                    width: 300
                }}
                value={props.chooseSpeciality}
				onChange={props.changeSpeciality}
                InputLabelProps={{
                    shrink: true,
                }}>   
                <option value={'Cardiologist'} >Cardiologist</option> 
                <option value={'Endocrinologist'}>Endocrinologist</option>
                <option value={'Dietist'}>Dietist</option>
            </TextInput> 
            <TextInput
                id="date"
                label="Date"
		        type="date"
                variant = 'outlined'
                value={props.chooseDate}
				onChange={props.changeDate}
                InputLabelProps={{
                    shrink: true,
                }} />
		    <ButtonIcon type='submit'>
                <SearchIcon/>
            </ButtonIcon>
        </form>
	</div>
	);
};

export default SearchDoctor;
