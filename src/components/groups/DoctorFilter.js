import React from 'react';
import TextInput from '../../components/customUi/TextInput';
//MATERIAL UI
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    mainContent: {
        marginTop: 30,
        width: '40rem',
        height: '100px',
        paddingTop: '2rem',
        borderRadius: '15px',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        boxShadow: '0 5px 5px 2px rgba(232, 232, 232, .5)',
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F0F9FF'
    }
});

const DoctorFilter = () => {
    const classes = useStyles();
	
	return (
		<div className= {classes.mainContent}>
            <FormControl className={classes.filter}>
                <TextInput
                    id="time"
		            label="Timeframe - 30min"
                    type="time"
                    placeholder="Select desired time"
                    variant = 'outlined'
                    style={{
                        width: 200
                    }}
		            className={classes.textField}
		            InputLabelProps={{
                        shrink: true,  
		            }} />
            </FormControl>
            <FormControl className={classes.input}>
                <TextInput
				    variant = 'outlined'
                    label="Price"
                    select
                    style= {{
                        width: 90
                    }}
                    InputLabelProps={{
                        native: true,
                    }}>   

                    <option value={10}>10</option> 
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </TextInput>
            </FormControl >
			<FormControl className={classes.input}>
                <TextInput
				    variant = 'outlined'
                    label="More filters"
                    select
                    style= {{
                        width: 130
                    }}
                    InputLabelProps={{
                        native: true,
                    }}>   
                    <option value={10}>10</option> 
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </TextInput>
            </FormControl >
            <FormControl className={classes.input}>
                <TextInput
				    variant = 'outlined'
                    label="Rating"
                    select
                    style= {{
                        width: 90
                    }}
                    InputLabelProps={{
                        native: true,
                    }}>   
                    <option value={10}>10</option> 
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </TextInput>
            </FormControl >
		</div>
	);
};

export default DoctorFilter;