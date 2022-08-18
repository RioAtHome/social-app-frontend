import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Avatar from '@material-ui/core/Avatar'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
}))

export default function EditProfile({ match }) {
  console.log(match)
  const classes = useStyles()
  const [values, setValues] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    about: '',
    photo: '',
    email: '',
    password: '',
    privacy: 0,

    redirectToProfile: false,
    error: '',
    id: ''
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      username: match.params.username
    }, {t: jwt.token}, signal).then((data) => {
      if (data & data.error) {
        setValues({...values, error: data.error})
      } else {
        console.log("DATTA==>")
        console.log(data)
        setValues({...values, id: data.id, first_name: data.profile.first_name, middle_name: data.profile.middle_name, last_name: data.profile.last_name, photo: data.profile.profile_pic, privacy: data.profile.privacy, email: data.email, about: data.profile.about})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.username])
  
  const clickSubmit = () => {
    let userData = new FormData()
    values.first_name && userData.append('first_name', values.first_name)
    values.middle_name && userData.append('middle_name', values.middle_name)
    values.last_name && userData.append('last_name', values.last_name)
    values.email && userData.append('email', values.email)
    values.password && userData.append('password', values.password)
    values.about && userData.append('about', values.about)
    values.photo && userData.append('photo', values.photo)
    
    update({
      username: match.params.username
    }, {
      t: jwt.token
    }, userData).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, 'redirectToProfile': true})
      }
    })
  }

  const handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    //userData.set(name, value)
    setValues({...values, [name]: value })
    console.log(values);
  }
    const photoUrl = values.id
                 ? `/api/user/photo/${values.id}?${new Date().getTime()}`
                 : '/api/user/defaultphoto'

    if (values.redirectToProfile) {
      return (<Redirect to={'/user/' + match.params.username}/>)
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Profile
          </Typography>
          <Avatar src={photoUrl} className={classes.bigAvatar}/><br/>
          <input accept="image/*" onChange={handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="default" component="span">
              Upload
              <FileUpload/>
            </Button>
          </label> <span className={classes.filename}>{values.photo ? values.photo.name : ''}</span><br/>
          <TextField id="first_name" label="first name" className={classes.textField} value={values.first_name} onChange={handleChange('first_name')} margin="normal"/><br/>
          <TextField id="middle_name" label="middle name" className={classes.textField} value={values.middle_name} onChange={handleChange('middle_name')} margin="normal"/><br/>
          <TextField id="last_name" label="last name" className={classes.textField} value={values.last_name} onChange={handleChange('last_name')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="About"
            multiline
            rows="2"
            value={values.about}
            onChange={handleChange('about')}
            className={classes.textField}
            margin="normal"
          /><br/>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
}
