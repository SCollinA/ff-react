// #1 Bring in the connect function
import { connect } from 'react-redux';

// #2 Bring in your action creators, if necessary
// import { addWeek, deleteWeek, addGame, deleteGame } from './store';
// import { submitSettings } from './store';

// #3 Bring in your Dumb Component that you want to enhance
import FFSchedules from './FFSchedules';

// #4 Write a function that describes how to translate Redux state into React props

// "translate state into props"
const mapStateToProps = ({weeks}) => { // receives store.getState()
    return {weeks}
}

// #4b Write a function that describes how to translate React callbacks into Redux dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        // name-of-prop : redux-thing
        // submitSettings: (userSettings) => {
        //     console.log('in the smart containers mapDispatchToProps')
        //     dispatch(submitSettings(userSettings))
        // }
    }
}

// #5 Enhance the Dumb Component using the `connect` function
const componentEnhancer = connect(mapStateToProps, mapDispatchToProps)
// #6 Export your new enhanced component
export default componentEnhancer(FFSchedules)