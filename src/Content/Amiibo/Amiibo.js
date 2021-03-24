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
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Formik } from "formik";
import * as Yup from "yup";

function Amiibo() {
  const [amiibos, setAmiibos] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedAmiibo, setSelectedAmiibo] = useState({ name: "" });
  const [editOpen, setEditOpen] = useState(false);
  const apiURL = "http://localhost:5050/amiibo";

  const handleClickEditOpen = (amiibo) => {
    setSelectedAmiibo(amiibo);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
  };

  const handleUpdate = async (values) => {
    console.log(selectedAmiibo._id)
    try {
      console.log("working");
      const result = await axios.put(`${apiURL}/update`, {
        data: {
          name: values.name,
          game: values.game,
          release: values.release,
          amiiboId: selectedAmiibo._id
        },

      });        console.log(result)
      if (result.status === 200) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickDeleteOpen = (amiibo) => {
    setSelectedAmiibo(amiibo);
    console.log(amiibo);
    setDeleteOpen(true);
  };

  const handleCloseDelete = async () => {
    setDeleteOpen(false);
  };

  const handleDelete = async () => {
    setDeleteOpen(false);
    console.log(selectedAmiibo._id)
    try {
      await axios.delete(`${apiURL}/delete`, {
        data: {
          amiiboId: selectedAmiibo._id,
        },
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
    console.log(selectedAmiibo._id);
  };

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
                        The {amiibo.name} Amiibo, from the {amiibo.game} series,
                        was originally released in North America on{" "}
                        {amiibo.release}.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleClickEditOpen(amiibo)}
                    >
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
      <Dialog
        open={editOpen}
        onClose={handleCloseEdit}
        aria-labelledby="edit-dialog-title"
      >
        <Formik
          initialValues={{
            name: selectedAmiibo?.name,
            game: selectedAmiibo?.game,
            release: selectedAmiibo?.release,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string("Enter Amiibo name.").required(
              "Name is required"
            ),
            game: Yup.string("Amiibo game"),
            release: Yup.string("Release date"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              console.log("worked");
              await handleUpdate(values);
              handleCloseEdit();
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              className={classes.dialogContent}
            >
              <DialogTitle id="edit-dialog-title">Edit Amiibo</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Make changes below to the data about this Amiibo:
                </DialogContentText>
                <TextField
                  autoFocus
                  id="name"
                  name="name"
                  label="Amiibo Name"
                  type="text"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Box className={classes.content}>
                  <TextField
                    autoFocus
                    id="game"
                    name="game"
                    label="Game Series"
                    type="text"
                    fullWidth
                    value={values.game}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.game && errors.game)}
                    helperText={touched.game && errors.game}
                  />
                  <TextField
                    autoFocus
                    name="release"
                    id="release"
                    label="Release Date"
                    type="text"
                    fullWidth
                    value={values.release}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.release && errors.release)}
                    helperText={touched.release && errors.release}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
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
