import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./amiibo.css";
import LazyLoad from "react-lazyload";
import { IconButton, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

function Amiibo() {
  const [amiibos, setAmiibos] = useState([]);

  const apiURL = "https://www.amiiboapi.com/api/amiibo/";

  const fetchData = async () => {
    const response = await axios.get(apiURL);

    setAmiibos(response.data.amiibo.splice(0, 50));
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
                    <Button
                      size="small"
                      color="primary"
                      onClick={() =>
                        window.open(
                          "https://www.nintendo.com/amiibo/",
                          "_blank"
                        )
                      }
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Amiibo;
