export const UPDATE_SRC = 'action/UPDATE_SRC'
export const UPDATE_DEST = 'action/UPDATE_DEST'
export const UPDATE_ONWARD_DATE = 'action/UPDATE_ONWARD_DATE'
export const UPDATE_RETURN_DATE = 'action/UPDATE_RETURN_DATE'
export const UPDATE_SEARCH_COMPLETED = 'action/UPDATE_SEARCH_COMPLETED'
export const UPDATE_ERROR = 'action/UPDATE_ERROR'
export const UPDATE_SERCH_DATA = 'action/UPDATE_SERCH_DATA'

const initialState = {
  src: {},
  dest: {},
  onward_date: null,
  return_date: null,
  searchData: [],
  isSearchCompleted: false,
  ifError: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_SRC:
      return {
        ...state,
        src: action.src
      }

    case UPDATE_DEST:
      return {
        ...state,
        dest: action.dest
      }

    case UPDATE_ONWARD_DATE:
      return {
        ...state,
        onward_date: action.onward_date
      }

    case UPDATE_RETURN_DATE:
      return {
        ...state,
        return_date: action.return_date
      }

    case UPDATE_SEARCH_COMPLETED:
      return {
        ...state,
        isSearchCompleted: action.isSearchCompleted
      }

    case UPDATE_ERROR:
      return {
        ...state,
        ifError: action.ifError
      }

    case UPDATE_SERCH_DATA:
      return {
        ...state,
        searchData: action.searchData
      }                  

    default:
      return state
  }
}

export const updateSrc = (src) => {
  return dispatch => {
    dispatch({
      type: UPDATE_SRC,
      src
    })
  }
}

export const updateDest = (dest) => {
  return dispatch => {
    dispatch({
      type: UPDATE_DEST,
      dest
    })
  }
}

export const updateOnwardDate = (onward_date) => {
  return dispatch => {
    dispatch({
      type: UPDATE_ONWARD_DATE,
      onward_date
    })
  }
}

export const updateReturnDate = (return_date) => {
  return dispatch => {
    dispatch({
      type: UPDATE_RETURN_DATE,
      return_date
    })
  }
}

export const updateSearchCompleted = (isSearchCompleted) => {
  return dispatch => {
    dispatch({
      type: UPDATE_SEARCH_COMPLETED,
      isSearchCompleted
    })
  }
}

export const updateError = (ifError) => {
  return dispatch => {
    dispatch({
      type: UPDATE_ERROR,
      ifError
    })
  }
}

export const updateSearchData = (searchData) => {
  return dispatch => {
    dispatch({
      type: UPDATE_SERCH_DATA,
      searchData
    })
  }
}
