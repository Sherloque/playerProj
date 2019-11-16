export const getHotChart = chart => (console.log(chart),{
    type: 'GET_HOT_CHART',
    payload: chart
})

export const fetchHotChart = () => dispatch => {
    fetch('/hotchart', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
        .then(data => data.json())
        .then(data => {console.log(data);dispatch(getHotChart(data))})
        .catch(err => { console.log(err) })
}
