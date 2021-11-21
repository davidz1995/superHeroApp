import { GET_HEROES, ADD_HERO, HERO_DETAIL, ADD_VILLAIN, DELETE_HERO, DELETE_VILLAIN } from "./actions/actionTypes";

const initialState = {
    getHeroByName: [],
    heroDetail: [],
    heroes: [],
    villains: []
  };

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_HEROES :
      return {
        ...state,
        getHeroByName:action.payload
      }
    case ADD_HERO :
      return {
        ...state,
        heroes: [...state.heroes, action.payload]
      }
    case ADD_VILLAIN :
      return {
        ...state,
        villains: [...state.villains, action.payload]
      }
    case HERO_DETAIL :
      return {
        ...state,
        heroDetail:action.payload
      }
    case DELETE_HERO :
        return {
          ...state,
          heroes: state.heroes.filter( hero  => hero.id !== action.payload)
        }
    case DELETE_VILLAIN :
    return {
      ...state,
      villains: state.villains.filter( villain  => villain.id !== action.payload)
    }
    default :
        return {
          ...state
        }
      }
  }

export default reducer 