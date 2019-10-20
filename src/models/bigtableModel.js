import Axios from 'axios';

export default {
    namespace: 'bigtable',
    state: {
        current: 1,
        columnsArr:[]
    },
    reducers:{
        CHANGECOLUMNS (state, {columnsArr}) {
            return {
                ...state,
                columnsArr
            };
        },
        CHANGERESULTS (state, {results}) {
            return {
                ...state,
                results
            };
        }
    },
    effects: {
        *GETCOLUMNSFROMLOCALSTORAGE (action, {put}) {
            // 试着从本地存储中读取columns字段
            const FromlocalStorage = JSON.parse(localStorage.getItem('columns'));
            // 如果这个字段读取出来是null，表示用户第一次来本站或者清空缓存
            if (FromlocalStorage === null ) {
                localStorage.setItem('columns', JSON.stringify(['image', 'id', 'brand', 'series', 'color']));
            }
            const columnsArr = JSON.parse(localStorage.getItem('columns'));
            yield put({'type':'CHANGECOLUMNS', columnsArr});
        },
        *SETCOLUMNSTOLOCALSTORAGE ({columns}, {put}) {
            localStorage.setItem('columns', JSON.stringify(columns));
            yield put({'type': 'GETCOLUMNSFROMLOCALSTORAGE'});
        },
        *INIT (action, {put}) {
            const {results} = yield Axios.get('./api/car').then(data => data.data);
            // console.log(results);
            yield put({'type':'CHANGERESULTS', results});
        }
    }
};