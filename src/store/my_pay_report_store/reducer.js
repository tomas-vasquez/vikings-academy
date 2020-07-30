
export default (state = [], action) => {

    if (action.type === 'ADD_MY_PAY_REPORT') {
        let aux = state; 
        aux.push(action.data);
        return aux;

    } else if (action.type === 'REPLACE_MY_PAY_REPORT') {
        return action.data;

    } else if (action.type === 'DELETE_MY_PAY_REPORT') {
        let aux = state; 
        return aux.filter(report => {
            console.log("report",report);
            console.log(report.report_id,action.id);
            return report.report_id !== action.id;
        });

    } else if (action.type === 'RESET') {

        return {};
    }

    return state;
}