const IS_FETCHING = 'IS_FETCHING';
const IS_SUCCESS = 'IS_SUCCESS';
const IS_ERROR = 'IS_ERROR';
const CATEGORY_LOADER='CATEGORY_LOADER'
const CATEGORY_SUCCESS='CATEGORY_SUCCESS'

const initialState={
    isLoading:false,
    errorMessage:null,
    categoryLoader:false,
    categoryError:null,
};

export const errorReducer = (state = initialState, action) => {
    switch(action.type){
        case IS_FETCHING:
            return {
                ...state,
                isLoading:true,
                errorMessage:null,
            };
        case IS_SUCCESS:
            return{
                ...state,
                isLoading:false,
                errorMessage:null,
            };
        case IS_ERROR:
            return{
                ...state,
                isLoading:false,
                errorMessage:action.payload,
            };
        case CATEGORY_SUCCESS:
            return{
                ...state,
                categoryLoader:false,
                categoryError:null
            }
        case CATEGORY_LOADER:
            return{
                ...state,
                categoryLoader:true,
            }
        default:
            return state;
    }

};