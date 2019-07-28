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
import SearchResults from './searchResults';
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
     this.onClickBtn = this.onClickBtn.bind(this);
     this.textInputArtist = React.createRef();
     this.textInputAlbum = React.createRef();
     this.state = { rows: [] };
  }

  onClickBtn() {
    const artist = this.textInputArtist.current.value;
    const album = this.textInputAlbum.current.value;

    if(artist !== '')
    {
        axios.get('https://itunes.apple.com/search?term='+ this.textInputArtist.current.value +'&entity=album&media=music&attribute=artistTerm')
        .then(response => {
          this.setState({ rows: response.data});
          })
        .catch(error => {
          console.log(error);
        });
    }
    else if(album !== '')
    {
        axios.get('https://itunes.apple.com/search?term='+ this.textInputAlbum.current.value +'&entity=album&media=music&attribute=albumTerm')  
          .then(response => {
          this.setState({ rows: response.data});
          })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentDidMount()
  {
    const artist = this.textInputArtist.current.value;
    const album = this.textInputAlbum.current.value;

    if(artist !== '')
    {
        axios.get('https://itunes.apple.com/search?term='+ this.textInputArtist.current.value +'&entity=album&media=music&attribute=artistTerm')
        .then(response => {
          this.setState({ rows: response.data});
          })
        .catch(error => {
          console.log(error);
        });
    }
    else if(album !== '')
    {
        axios.get('https://itunes.apple.com/search?term='+ this.textInputAlbum.current.value +'&entity=album&media=music&attribute=albumTerm')  
          .then(response => {
          this.setState({ rows: response.data});
          })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const { classes } = this.props;
    const rowsFiltered = this.state.rows;
    let searchResults;
    if (rowsFiltered) {
      searchResults = <SearchResults rows={rowsFiltered} />
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
            <Button variant="contained" color="primary" className={classes.button} type="submit" onClick={this.onClickBtn}>Search by artist</Button>
            </Box>
            <Box>
              {"Search by album:"}
              <input
                id="albuminput"
                type="text"
                ref={this.textInputAlbum}
              />
              <Button variant="contained" color="primary" className={classes.button} type="submit" onClick={this.onClickBtn}>Search by album</Button>
            </Box>
            <Box>
            {searchResults}
            </Box>  
            (2)pantalla que muestre todos los albums de un artista
            (3)hacer pantalla que muestre todos los temas del album por album
         </FormControl>
         </div>
         </Typography>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);