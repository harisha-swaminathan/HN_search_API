const defaultState=[];

export default (state=defaultState,action)=>{
    switch(action.type){
        case 'ADD_SEARCH_TERM':
            return[
                ...state,
                action.search
            ]
        default:
            return state
    }
}