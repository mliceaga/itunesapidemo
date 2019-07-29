import React from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';  
import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Button } from '@material-ui/core';
import SearchResultsAlbums from './searchResultsAlbums';
import SearchResultsArtists from './searchResultsArtists';
import ButtonAppBar from './Bar';

const styles =
  makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

class App extends React.Component {
   constructor(props) {
     super(props);
     this.onClickBtnArtist = this.onClickBtnArtist.bind(this);
     this.onClickBtnAlbum = this.onClickBtnAlbum.bind(this);
     this.textInputArtist = React.createRef();
     this.textInputAlbum = React.createRef();
     this.state = { rows: [], artists: 0 };
  }

  onClickBtnAlbum() {
    
    const album = this.textInputAlbum.current.value;
    if(album !== '')
    {
        axios.get('https://itunes.apple.com/search?term='+ this.textInputAlbum.current.value +'&entity=album&media=music&attribute=artistTerm')
        .then(response => {
          this.setState({ rows: response.data, artists: 0});
          })
        .catch(error => {
          console.log(error);
        });
    }
  };


  onClickBtnArtist() {
    const artist = this.textInputArtist.current.value;

    if(artist !== '')
    {
        axios.get('https://itunes.apple.com/search?term='+ this.textInputArtist.current.value +'&entity=album&media=music&attribute=songTerm')  
          .then(response => {
          this.setState({ rows: response.data, artists: 1});
          })
        .catch(error => {
          console.log(error);
        });
    }
  };
  
  render() {
    const { classes } = this.props;
    const rowsFiltered = this.state.rows;
    let searchResultsAlbums;
    let searchResultsArtists;
    if ((rowsFiltered.length !== 0 || rowsFiltered.length === undefined) && this.state.artists === 0) {
      searchResultsAlbums = <SearchResultsAlbums rows={rowsFiltered} />
    }
    else if ((rowsFiltered.length !== 0 || rowsFiltered.length === undefined) && this.state.artists === 1) {
      searchResultsArtists = <SearchResultsArtists rows={rowsFiltered} />
    }
    else
    {
      searchResultsAlbums = <br></br>
    }
    
    return (
        <React.Fragment>
        <ButtonAppBar></ButtonAppBar>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
          <div style={{ width: '100%' }}>
          <FormControl className={classes.container} noValidate autoComplete="off">
           <Box>
            {"Search by artist:"}
             <input
              id="artistinput"
              type="text"
              ref={this.textInputArtist}
            />
            <Button variant="contained" color="primary" className={classes.button} type="submit" onClick={this.onClickBtnArtist}>Search by artist</Button>
            </Box>
            <Box>
              {"Search by album:"}
              <input
                id="albuminput"
                type="text"
                ref={this.textInputAlbum}
              />
              <Button variant="contained" color="primary" className={classes.button} type="submit" onClick={this.onClickBtnAlbum}>Search by album</Button>
            </Box>
            <Box>
            {searchResultsAlbums}
            {searchResultsArtists}
            </Box>
         </FormControl>
         </div>
         </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);