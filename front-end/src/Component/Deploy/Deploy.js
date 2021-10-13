import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import SchoolIcon from '@mui/icons-material/School';

export const Deploy = ({prediction}) => {
    const { ml = '' } = prediction || {}
    const subHeader = 'Linear Regression'
    const headTitle = 'Admission Calculator'
    const computationTitle = 'Prediction:'

    useEffect(() => {
        if(ml) {
            if(window) window.scrollTo(0, 0)
        }
    }, [ml])

    return (
        <Paper elevation={3} variant="outlined" square style={{color: 'gray'}}>
            <Box p={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    <SchoolIcon fontSize="large" style={{display: 'inline-block', paddingRight: '10px'}}/>{headTitle}
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                    {subHeader}
                </Typography>
                {ml && 
                    <Box mt={3}>
                        <Typography variant="h5" component="h1" gutterBottom>{computationTitle}</Typography>
                        <Typography variant="h5" component="h1" gutterBottom>{ml}</Typography>
                    </Box>
                }
            </Box>
        </Paper>
    )
}
