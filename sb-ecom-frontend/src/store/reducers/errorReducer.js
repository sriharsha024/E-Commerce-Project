const IS_FETCHING = 'IS_FETCHING';
const IS_SUCCESS = 'IS_SUCCESS';
const IS_ERROR = 'IS_ERROR';
const CATEGORY_LOADER='CATEGORY_LOADER'
const CATEGORY_SUCCESS='CATEGORY_SUCCESS'
const BUTTON_LOADER='BUTTON_LOADER'
const initialState={
    isLoading:false,
    errorMessage:null,
    categoryLoader:false,
    categoryError:null,
    btnLoader:false,
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
                btnLoader:false,
                categoryError:null,
                categoryLoader:false,
            };
        case IS_ERROR:
            return{
                ...state,
                isLoading:false,
                errorMessage:action.payload,
                btnLoader:false,
                categoryLoader:false,
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
        case BUTTON_LOADER:
            return {
                ...state,
                btnLoader:true,
                errorMessage:null,
                categoryError:null,
            };
        default:
            return state;
    }

};