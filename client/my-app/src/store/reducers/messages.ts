import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import {IMessagesRedux} from '../../interfaces/IRedux'

const initialState:IMessagesRedux = {
    messages:[]
};

const message = (state:IMessagesRedux = initialState,action:any)=>{
    switch (action.type){
        case actionTypes.ADD_MESS:
            return updateObject(state,{
                messages:[...state.messages,action.mess]
            })
        case actionTypes.ADD_INIT_MESS:
            return updateObject(state,{
                messages:action.mess
            })
        case actionTypes.REMOVE_MESS:
            return updateObject(state,{
                messages:[]
            })
        default: {
            return state
        }
    }
}

export default message