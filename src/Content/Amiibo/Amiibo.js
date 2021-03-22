import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./amiibo.css";
import LazyLoad from "react-lazyload";
import {
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function Amiibo() {
  const [amiibos, setAmiibos] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedAmiibo, setSelectedAmiibo] = useState(null)

  const handleClickDeleteOpen = (amiibo) => {
    setSelectedAmiibo(amiibo)
    console.log(amiibo)
    setDeleteOpen(true);
  };

 const apiURL = "https://dgm-4790-server.herokuapp.com/amiibo";

  const handleCloseDelete = async () => {
    setDeleteOpen(false);
  };

  const handleDelete = async () => {
    setDeleteOpen(false)
    try {
      await axios.delete(`${apiURL}/delete`, {
        data: {
          amiiboId: selectedAmiibo._id
        }
      })
      fetchData()
    } catch (err) {
      console.error(err)
    }
    console.log(selectedAmiibo._id)
  }

 

  const fetchData = async () => {
    const response = await axios.get(apiURL);

    setAmiibos(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const useStyles = makeStyles({
    root: {
      maxWidth: 250,
      margin: "1rem",
    },
    media: {
      height: 400,
    },
  });

  const classes = useStyles();

  return (
    <div className="app">
      <form className="searchInput">
        <TextField placeholder="Search" />
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>
      <div className="container-container">
        {amiibos &&
          amiibos.map((amiibo) => {
            return (
              <div className="cards-container" key={amiibo.tail}>
                <Card className={classes.root}>
                  <CardActionArea
                    onClick={() => window.open(amiibo.image, "_blank")}
                  >
                    <LazyLoad offset={100}>
                      <CardMedia
                        className={classes.media}
                        image={amiibo.image}
                        title={amiibo.name}
                      />
                    </LazyLoad>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {amiibo.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        The {amiibo.name} Amiibo, from the {amiibo.gameSeries}{" "}
                        series, was originally released in North America on{" "}
                        {amiibo.release.na}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleClickDeleteOpen(amiibo)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            );
          })}
      </div>
      <Dialog open={deleteOpen} onClose={handleCloseDelete}>
        <DialogTitle>Delete Amiibo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Amiibo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Amiibo;
