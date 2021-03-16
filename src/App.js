import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import EventList from "./components/eventlist/EventList";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from '@material-ui/core/Button';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

const App = () => {
  const [events, setEvents] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [state, setState] = useState({
    loc: "",
    name: "loc"
  });

  const [cateState, setCateState] = useState({
    cat: "",
    name: "cat",
  });
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const maxDate = new Date().setMonth(new Date().getMonth() + 6);
  const classes = useStyles();

  const onSearchItem = (evt) => {
    const searchString = evt.target.value;
    setSearchString(searchString);
  };

  const { cartItems, isUserLoggedIn } = useSelector((state) => ({
    cartItems: state.CartReducer.cartItems,
    isUserLoggedIn: state.CartReducer.isUserLoggedIn,
  }));

  const initData = async () => {

    const [categoryList, locationList] = await Promise.all([
      axios.get(`https://eventfulness.herokuapp.com/api/categories`),
      axios.get(`https://eventfulness.herokuapp.com/api/locations`)
    ]);
    setCategories(categoryList.data || []);
    setLocations(locationList.data || []);

    setCateState({
      ...cateState,
      ["cat"]: categoryList.data[0]
    });

    setState({
      ...state,
      ["loc"]: locationList.data[0]
    });

    
    // as setstate is asynchronous , we are passing category and location
    let eventUrl = buildEventRequestUrl(categoryList.data[0],locationList.data[0]);
    
    axios.get(eventUrl).then((res) => {
      res.data.sort((a, b) => a.category.localeCompare(b.category));
      setEvents(res.data);
    });

  };

  const buildEventRequestUrl= (category,location)=>{
    let cat=category||cateState.cat;
    let loc=location||state.loc;
    let from = new Date(selectedFromDate).getTime();
    let to = new Date(selectedToDate).getTime();
    let defaultDate = `${from}-${to}`;
    let eventUrl = `https://eventfulness.herokuapp.com/api/events?category=${cat}&fromDateTime=${defaultDate}&location=${loc}`;
    return eventUrl;
  }

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    setFilteredItems([]);
    if (searchString.length > 0) {
      const filteredItems = events.filter(function (l) {
        return l.name.toLowerCase().match(searchString);
      });
      setFilteredItems(filteredItems);
    }
  }, [searchString]);

  const onCategoryChange = event => {

    const name = event.target.name;
    setCateState({
      ...cateState,
      [name]: event.target.value
    });
  };

  const locationChange = event => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  };

  const handleSearchClick = event => {
    let eventUrl = buildEventRequestUrl();
    axios.get(eventUrl).then((res) => {
      res.data.sort((a, b) => a.category.localeCompare(b.category));
      setEvents(res.data);
    });

  }

  useEffect(() => {
    setFilteredItems([]);
    const filteredItems = events.filter(function (l) {
      return l.category.toLowerCase().match(cateState.cat);
    }
    );
    setFilteredItems(filteredItems);

  }, [cateState]);

  useEffect(() => {
    setFilteredItems([]);
    const filteredItems = events.filter(function (l) {
      return l.category.toLowerCase().match(cateState.cat);
      // should be changed to l.location
    }
    );
    setFilteredItems(filteredItems);

  }, [state]);


  return (
    <div className="wrapper">
      <div className="header">
        <Header
        />
      </div>
      <div className={classes.root}>
        <div className="main">
          <div style={{ display: "flex" }}>
            <div>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="filled-cat-native-simple">Categories</InputLabel>
                <Select
                  native
                  value={cateState.cat}
                  onChange={onCategoryChange}
                  inputProps={{
                    name: "cat",
                    id: "filled-cat-native-simple"
                  }}
                >
                  {
                    categories.map((c, index) => {
                      return <option key={index} value={c}>{c}</option>
                    }
                    )}

                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="filled-location-native-simple">Locations</InputLabel>
                <Select
                  native
                  value={state.loc}
                  onChange={locationChange}
                  inputProps={{
                    name: "loc",
                    id: "filled-location-native-simple"
                  }}
                >
                  {
                    locations.map((l, index) => {
                      return <option key={index} value={l}>{l}</option>
                    }
                    )}
                </Select>
              </FormControl>
            </div>

            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-1"
                    label="From"
                    value={selectedFromDate}
                    onChange={handleFromDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <Divider orientation="vertical" flexItem />
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-2"
                    label="To"
                    value={selectedToDate}
                    onChange={handleToDateChange}
                    maxDate={new Date(maxDate)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <div style={{ marginTop: "28px" }}>
              <Button variant="outlined" onClick={handleSearchClick}>Search</Button>
            </div>


          </div>

          <EventList
            events={filteredItems.length > 0 ? filteredItems : events}
            cartItems={cartItems}
          />
        </div>
      </div>
      <div className="header">
        <Footer />
      </div>
    </div>
  );
};

export default App;
