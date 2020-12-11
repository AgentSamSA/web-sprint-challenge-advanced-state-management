import axios from 'axios';
import Smurf from '../components/Smurf';

export const FETCH_START = "FETCH_START";
export const FETCH_SMURFS = "FETCH_SMURF";
export const ADD_SMURF = "ADD_SMURF";
export const FETCH_FAIL = "FETCH_FAIL";
export const SMURF_DATA_FAIL = "SMURF_DATA_FAIL";

export const getSmurfs = () => dispatch => {
    dispatch({ type: FETCH_START });

    axios
        .get("http://localhost:3333/smurfs")
        .then(res => {
            dispatch({ type: FETCH_SMURFS, payload: res.data });
        })
        .catch(err => dispatch({ type: FETCH_FAIL, payload: err }));
}

export const addSmurf = (smurfData) => dispatch => {
    dispatch({ type: SMURF_DATA_FAIL, payload: "must include a name, nickname, and position" });

    axios
        .post("http://localhost:3333/smurfs", smurfData)
        .then(res => {
            dispatch({ type: ADD_SMURF, payload: [...res.data, smurfData] });
        })
        .catch(err => dispatch({ type: FETCH_FAIL, payload: err }));
}

//Task List:
//1. Add fetch smurfs action: 
//              - fetch and return initial list of smurfs
//              - dispatch actions that indicate if we are waiting for a server response
//              - dispatch an error text action if an error is returned from the server
//2. Add add smurf action:
//              - dispatch an error text action if smurf data does not includes a name, nickname and position field
//              - send a post request with the smurf as body to see if there is an error
//              - dispatch add smurf action if request is successful
//              - dispatch an error text action if an request returns an error
//3. Add set error text action:
//              - return action object setting error text
//4. Any other actions you deem nessiary to complete application.