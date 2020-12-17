import React, {useEffect, useState} from 'react';
import TextInput from '../../components/customUi/TextInput';
//MATERIAL UI
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    filter: {
        marginTop: 30,
        width: '608.69px',
        height: '100px',
        paddingTop: '2rem',
        borderRadius: '8px',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        boxShadow: '0px 12px 26px rgba(16, 30, 115, 0.06)',
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: '#FFFFFF',
    }, 
    timezone:{
        position: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 'auto',
        width: '60%',
        height: '41.1px',
        // left: '235px',
        // top: '342.57px',
        background: '#D7FEF1',
        boxShadow: '0px 6px 12px rgba(16, 30, 115, 0.06)',
        borderRadius: '8px',
    }
});



const DoctorFilter = () => {
    
    const [timezone, setTimezone] = useState('Eastern Time')
    const [place, setPlace] = useState('New York, United States')

    useEffect(() => {
        const date = new Date();
        const dateAsString = date.toString();
        const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];
        setTimezone(timezone)
        // do the place's time zone
      });

    const classes = useStyles();
	
	return (
		<div className={classes.mainContent}>
            <Divider orientation='horizontal' style={{width: '60%', margin: 'auto', marginTop: 10, marginBottom: 15}}/>
            <Box className={classes.timezone}>
                <FormControl style={{position: 'flex', flexDirection: 'row', paddingLeft: 40, paddingTop: 10}}>
                <Typography >We believe you are in - {timezone} ({place}) -</Typography>
                <TextInput
                    id="time"
                    type="time"
                    placeholder="CHANGE THE TIME ZONE"
                    multiline
                    style={{marginLeft: 20}}
		            InputLabelProps={{
                        shrink: true,  
		            }} 
                    />
            </FormControl>
            </Box>
            <Divider orientation='horizontal' style={{width: '60%', margin: 'auto', marginTop: 15, marginBottom: 20}}/>
            <Box className= {classes.filter}>

            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M33.7982 0.5H8.11004C4.16426 0.5 0.954102 3.71016 0.954102 7.65594V33.3441C0.954102 37.2898 4.16426 40.5 8.11004 40.5H33.7982C37.7439 40.5 40.9541 37.2898 40.9541 33.3441V7.65594C40.9541 3.71016 37.7439 0.5 33.7982 0.5ZM38.6104 33.3441C38.6104 35.9975 36.4516 38.1562 33.7982 38.1562H8.11004C5.4566 38.1562 3.29785 35.9975 3.29785 33.3441V7.65594C3.29785 5.0025 5.4566 2.84375 8.11004 2.84375H33.7982C36.4516 2.84375 38.6104 5.0025 38.6104 7.65594V33.3441Z" fill="#A0A4A8"/>
<path d="M34.761 9.28651H16.9125C16.4218 7.82909 15.0433 6.77612 13.4225 6.77612C11.8017 6.77612 10.4232 7.82909 9.9325 9.28651H7.14648C6.4993 9.28651 5.97461 9.8112 5.97461 10.4584C5.97461 11.1056 6.4993 11.6303 7.14648 11.6303H9.93258C10.4233 13.0877 11.8018 14.1407 13.4226 14.1407C15.0434 14.1407 16.4219 13.0877 16.9126 11.6303H34.7611C35.4083 11.6303 35.933 11.1056 35.933 10.4584C35.933 9.8112 35.4083 9.28651 34.761 9.28651ZM13.4225 11.7969C12.6845 11.7969 12.084 11.1964 12.084 10.4584C12.084 9.72034 12.6845 9.11987 13.4225 9.11987C14.1605 9.11987 14.761 9.72034 14.761 10.4584C14.761 11.1964 14.1605 11.7969 13.4225 11.7969Z" fill="#A0A4A8"/>
<path d="M34.761 19.328H31.9749C31.4842 17.8706 30.1056 16.8176 28.4849 16.8176C26.8642 16.8176 25.4857 17.8706 24.995 19.328H7.14648C6.4993 19.328 5.97461 19.8527 5.97461 20.4999C5.97461 21.1471 6.4993 21.6718 7.14648 21.6718H24.995C25.4857 23.1292 26.8643 24.1822 28.485 24.1822C30.1057 24.1822 31.4843 23.1292 31.975 21.6718H34.7611C35.4083 21.6718 35.933 21.1471 35.933 20.4999C35.933 19.8527 35.4083 19.328 34.761 19.328ZM28.485 21.8384C27.747 21.8384 27.1465 21.2379 27.1465 20.4999C27.1465 19.7618 27.747 19.1614 28.485 19.1614C29.223 19.1614 29.8235 19.7618 29.8235 20.4999C29.8235 21.2379 29.223 21.8384 28.485 21.8384Z" fill="#A0A4A8"/>
<path d="M34.761 29.3698H21.9334C21.4427 27.9123 20.0641 26.8594 18.4434 26.8594C16.8226 26.8594 15.4441 27.9123 14.9534 29.3698H7.14648C6.4993 29.3698 5.97461 29.8945 5.97461 30.5416C5.97461 31.1888 6.4993 31.7135 7.14648 31.7135H14.9534C15.4441 33.1709 16.8226 34.2239 18.4434 34.2239C20.0641 34.2239 21.4427 33.1709 21.9334 31.7135H34.7611C35.4083 31.7135 35.933 31.1888 35.933 30.5416C35.933 29.8945 35.4083 29.3698 34.761 29.3698ZM18.4434 31.8802C17.7053 31.8802 17.1048 31.2798 17.1048 30.5417C17.1048 29.8037 17.7053 29.2032 18.4434 29.2032C19.1814 29.2032 19.7819 29.8036 19.7819 30.5416C19.7819 31.2797 19.1814 31.8802 18.4434 31.8802Z" fill="#A0A4A8"/>
</svg>
            <FormControl className={classes.form}>
                <TextInput
                    id="time"
                    type="time"
                    placeholder="Desired time"
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
                    style= {{
                        width: 90
                    }}
                    InputLabelProps={{
                        // native: true,
                    }}>   

                </TextInput>
            </FormControl >
			<FormControl className={classes.input}>
                <TextInput
				    variant = 'outlined'
                    label="More filters"
                    style= {{
                        width: 130
                    }}
                    InputLabelProps={{
                        // native: true,
                    }}>   
                </TextInput>
            </FormControl >
            <FormControl className={classes.input}>
                <TextInput
				    variant = 'outlined'
                    label="Rating"
                    style= {{
                        width: 90
                    }}
                    InputLabelProps={{
                        // native: true,
                    }}>   
                </TextInput>
            </FormControl >
            </Box>
		</div>
	);
};

export default DoctorFilter;