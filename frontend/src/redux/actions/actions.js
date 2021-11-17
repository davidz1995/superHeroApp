import axios from "axios";
import { GET_HEROES, ADD_HERO } from "./actionTypes";
import { API_URL } from '../../constants'

export const getByName = (name) => {
    const API_KEY = process.env.REACT_APP_API_KEY
    return async (dispatch) => {
        if (name) {
        const response = await axios.get(`${API_URL}${API_KEY}/search/${name}`)
        let error = [{name: 'Not found'}]
        if(response.status === 200) dispatch({type: GET_HEROES, payload: response.data})
        if(response.status === 404) dispatch({type: GET_HEROES, payload: error})
        } 
    }
}

export const addHero = (heroID) => {
    const API_KEY = process.env.REACT_APP_API_KEY
    return async (dispatch) => {
        if (heroID) {
        const response = await axios.get(`${API_URL}${API_KEY}/${heroID}`)
        let error = [{name: 'Not found'}]
        if(response.status === 200) dispatch({type: ADD_HERO, payload: response.data})
        if(response.status === 404) dispatch({type: ADD_HERO, payload: error})
        } 
    }
}





