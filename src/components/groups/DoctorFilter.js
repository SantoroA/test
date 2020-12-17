import React, {useEffect, useState} from 'react';
import TextInput from '../../components/customUi/TextInput';
import FilterIcon from '../customIcons/FilterIcon'
//MATERIAL UI
import { Divider, Box, Typography, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    mainContent: {
        width: '67%',
        marginTop: 20,
        margin: 'auto',
    },
    timezone: {
        position: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        width: '100%',
        background: '#D7FEF1',
        boxShadow: '0px 6px 12px rgba(16, 30, 115, 0.06)',
        borderRadius: '8px',
        margin: 'auto',
        marginTop: 20,
        marginBottom: 20
    },
     filter: {
         marginTop: 30,
         width: '65%',
         display: 'flex',
         margin: 'auto',
         borderRadius: '8px',
         boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)',
         background: '#FFFFFF',
         justifyContent: 'space-between',
         paddingTop: '1rem',
         paddingBottom: '1rem',
         paddingLeft: '2rem',
         paddingRight: '2rem',
    }, 
});

const DoctorFilter = () => {
    
    const [timezone, setTimezone] = useState('Eastern Time')
    const [nameZone, setNameZone] = useState('New York, United States')

    useEffect(() => {
        const date = new Date();
        const dateAsString = date.toString();
        const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];
        const nameTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTimezone(timezone)
        setNameZone(nameTimeZone)
      });

    const classes = useStyles();
	return (
		<div className={classes.mainContent}>
            <Divider orientation='horizontal' />
            <Box >
                <FormControl className={classes.timezone}>
                <Typography >We believe you are in - {timezone} ({nameZone}) -</Typography>
                <TextInput
                    id="time"
                    type="time"
                    placeholder="CHANGE THE TIME ZONE"
                    multiline
		            InputLabelProps={{
                        shrink: true,  
		            }} 
                    />
            </FormControl>
            </Box>
            <Divider orientation='horizontal' />
            <Box className= {classes.filter}>
                <FilterIcon style={{fontSize:"3rem", color:"gray"}}/>
                <FormControl >
                    <TextInput
                        id="time"
                        type="time"
                        placeholder="Desired time"
                        variant = 'outlined'
                        style={{
                            width: 200
                        }}
                        InputLabelProps={{
                            shrink: true,  
                        }} />
                </FormControl>
                <FormControl >
                    <TextInput
                        variant = 'outlined'
                        label="Price"
                        style= {{
                            width: 90
                        }}
                    >   
                    </TextInput>
                </FormControl >
                <FormControl >
                    <TextInput
                        variant = 'outlined'
                        label="More filters"
                        style= {{
                            width: 130
                        }}
                        >   
                    </TextInput>
                </FormControl >
                <FormControl >
                    <TextInput
                        variant = 'outlined'
                        label="Rating"
                        style= {{
                            width: 90
                        }}
                        >   
                    </TextInput>
                </FormControl >
            </Box>
		</div>
	);
};

export default DoctorFilter;
