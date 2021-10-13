import React, { useEffect } from "react"
import { useState } from 'react';
import { Button } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Deploy } from './Component/Deploy/Deploy'

// const dummyRow = {
//   "GRE": 324,
//   "TOEFL": 107,
//   "Rating": 4,
//   "SOP": 4.0,
//   "LOR": 4.5,
//   "CGPA": 8.87,
//   "Research": 1
//   }

function App() {
  const [prediction, setPrediction] = useState(undefined)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [GRE, setGRE] = useState(324)
  const [TOEFL, setTOEFL] = useState(107)
  const [Rating, setRating] = useState(4)
  const [SOP, setSOP] = useState(4.0)
  const [LOR, setLOR] = useState(4.5)
  const [CGPA, setCGPA] = useState(8.87)
  // const [Research, setResearch] = useState(1)
  const [Research, setResearch] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [prediction])

  const DoRequest = async() => {
    setSubmitDisabled(true)
    const toBePredicted = {
      GRE,
      TOEFL,
      Rating,
      SOP,
      LOR,
      CGPA,
      Research
    }
    console.log(JSON.stringify(toBePredicted))
    try {
      fetch('/api', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        // body: JSON.stringify(dummyRow)
        body: JSON.stringify(toBePredicted)
      })
      .then(response => response.json())
      .then(data => {
        setPrediction(data)
        setSubmitDisabled(false)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const greUpdate = e => setGRE(isNaN(e.target.value) ? 0 : Number(e.target.value))
  // const researchUpdate = e => setResearch(isNaN(e.target.value) ? 0 : Number(e.target.value))
  const researchUpdate = e => setResearch(e.target.checked)
  const cgpaUpdate = e => setCGPA(isNaN(e.target.value) ? 0 : Number(e.target.value))
  const lorUpdate = e => setLOR(isNaN(e.target.value) ? 0 : Number(e.target.value))
  const sopUpdate = e => setSOP(isNaN(e.target.value) ? 0 : Number(e.target.value))
  const ratingUpdate = e => setRating(isNaN(e.target.value) ? 0 : Number(e.target.value))
  const tofelUpdate = e => setTOEFL(isNaN(e.target.value) ? 0 : Number(e.target.value))
        

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box mt={8}>
          <Deploy prediction={prediction}/>
        </Box>
        <Box mt={6} ml={4}>
            <Box mt={2} mb={3} mr={4}>
              <Alert severity="info">
                <AlertTitle>Default Prediction: <strong>0.8053278309755671</strong></AlertTitle>
              </Alert>
            </Box>
            <Box>
              <TextField
                id="standard-basic"
                type="number"
                label="GRE" variant="standard" value={GRE} style={{marginTop: 24}} onChange={greUpdate}/><br/>
              <TextField
                id="standard-basic"
                type="number"
                label="TOEFL" variant="standard" value={TOEFL} style={{marginTop: 24}} onChange={tofelUpdate}/><br/>
              <TextField
                id="standard-basic"
                type="number"
                label="Rating" variant="standard" value={Rating} style={{marginTop: 24}} onChange={ratingUpdate}/><br/>
              <TextField
                id="standard-basic"
                type="number"
                label="SOP" variant="standard" value={SOP} style={{marginTop: 24}} onChange={sopUpdate}/><br/>
                <TextField
                id="standard-basic"
                type="number"
                label="LOR" variant="standard" value={LOR} style={{marginTop: 24}} onChange={lorUpdate}/><br/>
              <TextField
                id="standard-basic"
                type="number"
                label="CGPA" variant="standard" value={CGPA} style={{marginTop: 24}} onChange={cgpaUpdate}/><br/>
              {/* <TextField
                id="standard-basic"
                type="number"
                label="Research" variant="standard" value={Research} style={{marginTop: 24}} onChange={researchUpdate}/><br/> */}
              <Box my={4} ml={1}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked  checked={Research} onChange={researchUpdate}/>} label="Research" />
                </FormGroup>
              </Box>
            </Box>
            <Box mt={6} mb={8}>
              <Button color="primary" variant="contained" onClick={DoRequest} disabled={submitDisabled}> 
                Get Prediction
              </Button>
            </Box>
          </Box>
      </Container>
    </>
  )
}

export default App
