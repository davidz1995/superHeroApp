import { GET_HEROES, ADD_HERO } from "./actions/actionTypes";

let heroes = []

const initialState = {
    getHeroByName: [],
    heroes
  };

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_HEROES :
      return {
        ...state,
        getHeroByName:action.payload
      }
    case ADD_HERO :
      heroes.push(action.payload)
      return {
        ...state
      }
    default:
        return {
          ...state
        }
      }
  }

export default reducer 