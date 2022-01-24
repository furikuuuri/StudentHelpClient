const SET_CATEGORY = "SET_CATEGORY"
const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY"
const SET_CURRENT_CATEGORY_UPDATE = "SET_CURRENT_CATEGORY_UPDATE"
const ADD_CATEGORY = "ADD_CATEGORY"
const PUSH_TO_STACK="PUSH_TO_STACK"
const POP_FROM_STACK="POP_FROM_STACK"
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"
const SET_POPUPTASK_DISPLAY = "SET_POPUPTASK_DISPLAY"
const SET_POPUP_DISPLAY_BUY = "SET_POPUP_DISPLAY_BUY"
const SET_POPUPUPDATE_DISPLAY_BUY = "SET_POPUPUPDATE_DISPLAY_BUY"
const SET_TASKS="SET_TASKS"
const ADD_TASKS="ADD_TASKS"
const SET_CURRENT_TASK="SET_CURRENT_TASK"

const SET_REQTASKS="SET_REQTASKS"
const REMOVE_TASK="REMOVE_TASK"

const SET_MY_TASK="SET_MY_TASK"
const REMOVE_CATEGORY="REMOVE_CATEGORY"
const LOGOUTC="LOGOUT"
const REMOVE_TASK_ADMIN="REMOVE_TASK_ADMIN"
const SET_POPUP_CATEGORY_UPDATE_DISPLAY="SET_POPUP_CATEGORY_UPDATE_DISPLAY"




const defaultState = {
    currentTask:'',
    currentCategoryUpdate:'',
    myTasks:[],
    category: [],
    tasks:[],
    reqtasks:[],
    currentCategory: 0,
    popupDisplay:'none',
    popupTaskDisplay:'none',
    popupBuyDisplay:'none',
    popupUpdateDisplay:'none',
    popupCategoryUpdate:'none',
    categoryStack:[]

}

export default function categoryReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CATEGORY: return {...state, category: action.payload}
        case SET_TASKS: return {...state, tasks: action.payload}
        case SET_CURRENT_CATEGORY: return {...state, currentCategory: action.payload}
        case ADD_CATEGORY: return {...state, category: [...state.category,action.payload]}
        case ADD_TASKS: return {...state, tasks: [...state.tasks,action.payload]}
        case SET_POPUP_DISPLAY: return {...state, popupDisplay:action.payload}
        case SET_POPUPTASK_DISPLAY: return {...state, popupTaskDisplay:action.payload}
        case SET_POPUP_DISPLAY_BUY: return {...state, popupBuyDisplay:action.payload}
        case SET_POPUPUPDATE_DISPLAY_BUY: return {...state, popupUpdateDisplay:action.payload}
        case SET_POPUP_CATEGORY_UPDATE_DISPLAY: return {...state, popupCategoryUpdate:action.payload}
        case SET_REQTASKS: return {...state, reqtasks: action.payload}
        case SET_CURRENT_TASK: return {...state, currentTask: action.payload}

        case SET_MY_TASK: return {...state, myTasks: action.payload}
        case SET_CURRENT_CATEGORY_UPDATE: return {...state, currentCategoryUpdate: action.payload}


        case REMOVE_TASK: return {...state, reqtasks: [...state.reqtasks.filter(file => file.id != action.payload)]}
        case REMOVE_CATEGORY: return {...state, category: [...state.category.filter(file => file.id != action.payload)]}
        case PUSH_TO_STACK:return{...state,categoryStack: [...state.categoryStack, action.payload]}

        case REMOVE_TASK_ADMIN:return{...state, tasks: [...state.tasks.filter(file => file.id != action.payload)]}
        case LOGOUTC:return {...state,currentTask:'',
        
        myTasks:[],
        category: [],
        tasks:[],
        reqtasks:[],
        currentCategory: 0,
        popupDisplay:'none',
        popupUpdateDisplay:'none',
        popupTaskDisplay:'none',
        popupBuyDisplay:'none',
        categoryStack:[]}
        default:
            return state
    }
}

export const setCategories = (categories) => ({type: SET_CATEGORY, payload: categories})
export const setTasks = (tasks) => ({type: SET_TASKS, payload: tasks})
export const setCurrentCategory= (currentCategory) => ({type: SET_CURRENT_CATEGORY, payload: currentCategory})
export const addCategoryReducer= (category) => ({type: ADD_CATEGORY, payload: category})
export const addTaskReducer= (task) => ({type: ADD_TASKS, payload: task})
export const setPopupDisplay= (dis) => ({type: SET_POPUP_DISPLAY, payload: dis})
export const setPopupTaskDisplay= (dis1) => ({type: SET_POPUPTASK_DISPLAY, payload: dis1})
export const setPopupCategoryUpdateDisplay= (dis1) => ({type: SET_POPUP_CATEGORY_UPDATE_DISPLAY, payload: dis1})
export const pushToStack = (dir) => ({type: PUSH_TO_STACK, payload: dir})

export const setReqTasks = (tasks) => ({type: SET_REQTASKS, payload: tasks})
export const removeReqTask = (id) => ({type: REMOVE_TASK, payload: id})
export const removeCategory = (id) => ({type: REMOVE_CATEGORY, payload: id})
export const setPopupBuyDisplay= (dis) => ({type: SET_POPUP_DISPLAY_BUY, payload: dis})

export const setCurrentTask = (tasks) => ({type: SET_CURRENT_TASK, payload: tasks})

export const setMyTasks = (tasks) => ({type: SET_MY_TASK, payload: tasks})
export const logoutCategory=()=>({type:LOGOUTC})
export const removeTaskAdmin = (id) => ({type: REMOVE_TASK_ADMIN, payload: id})
export const setPopupUpdateDisplay= (dis) => ({type: SET_POPUPUPDATE_DISPLAY_BUY, payload: dis})