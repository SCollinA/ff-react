// #1 Bring in the connect function
import { connect } from 'react-redux';

// #2 Bring in your action creators, if necessary
// import { addWeek, deleteWeek, addGame, deleteGame } from './store';
import { makeSchedule } from './store';

// #3 Bring in your Dumb Component that you want to enhance
import FFSchedulerComponent from './FFSchedulerComponent';

// #4 Write a function that describes how to translate Redux state into React props

// "translate state into props"
const mapStateToProps = ({schedule}) => { // receives store.getState()
    return {schedule}
}

// #4b Write a function that describes how to translate React callbacks into Redux dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        // name-of-prop : redux-thing
        makeSchedule: (scheduleInfo) => {
            console.log('in the smart containers mapDispatchToProps')
            dispatch(makeSchedule(scheduleInfo))
        }
        // addWeek: () => dispatch(addWeek()),
        // deleteWeek: () => dispatch(deleteWeek()),
        // addGame: () => dispatch(addGame()),
        // deleteGame: () => dispatch(deleteGame())
    }
}

// #5 Enhance the Dumb Component using the `connect` function
const componentEnhancer = connect(mapStateToProps, mapDispatchToProps);
// #6 Export your new enhanced component
export default componentEnhancer(FFSchedulerComponent);