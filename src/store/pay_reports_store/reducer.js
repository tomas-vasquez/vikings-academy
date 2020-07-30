
export default (state = [], action) => {
    let aux;
    if (action.type === 'ADD_PAY_REPORT') {

        aux = state;
        aux.push(action.data);
        return aux;

    } else if (action.type === 'REPLACE_PAY_REPORTS') {

        return action.data;

    } else if (action.type === 'DELETE_PAY_REPORT') {

        aux = state;

        aux = aux.filter(pay_report => {
            return pay_report.report_id !== action.data;
        });

        return aux;

    } else if (action.type === 'RESET') {

        return [];
    }

    return state;
}