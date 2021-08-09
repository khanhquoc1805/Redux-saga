import { ListResponse,Student,City } from './../../model';
import { dashboardActions, RankingByCity } from './dashboardSlice';
import { takeLatest,all,call,put } from "@redux-saga/core/effects"
import studentApi from '../../api/studentApi';
import cityApi from '../../api/cityApi';


function* fetchStatistics() {
    const responseList : Array<ListResponse<Student>> = yield all([
        call(studentApi.getAll, {_page: 1 , _limit: 1, gender: 'male'}),
        call(studentApi.getAll, {_page: 1 , _limit: 1, gender: 'female'}),
        call(studentApi.getAll, {_page: 1 , _limit: 1, mark_gte: 8}),
        call(studentApi.getAll, {_page: 1 , _limit: 1, mark_lte: 5})
    ])

    const statisticsList = responseList.map(x => x.pagination._totalRows);
    const [maleCount,feMaleCount, hightMarkCount,lowMarkCount] = statisticsList;

    yield put(dashboardActions.setStatistics({maleCount,feMaleCount, hightMarkCount,lowMarkCount}));
}
function* fetchHighestStudentList() {
    const {data} : ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark' ,
        _order: 'desc'
    });

    yield put(dashboardActions.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
    const {data} : ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark' ,
        _order: 'asc'
    });

    yield put(dashboardActions.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
    // fetch city list
    const {data: cityList} : ListResponse<City> = yield call(cityApi.getAll);
    //fetch ranking per city

    const callList = cityList.map( x =>
        call(studentApi.getAll, {
            _page: 1,
            _limit: 5,
            _sort: 'mark' ,
            _order: 'desc',
            city: x.code,
        }) );

        const responseList : Array<ListResponse<Student>> =  yield all(callList);

        const rankingByCityList : Array<RankingByCity> = responseList.map ((x, index )=> ({
            cityId: cityList[index].code,
            cityName: cityList[index].name,
            rankingList: x.data,
        }));

    // update state

    yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}


function* fetchDashboardData() {
    try {
        yield all([
            call(fetchStatistics),
            call(fetchHighestStudentList),
            call(fetchLowestStudentList),
            call(fetchRankingByCityList)
        ])

        yield put(dashboardActions.fetchDataSuccess());
        
    } catch (error) {
        console.log("failed to fetch dashboard data", error)
        yield put(dashboardActions.fetchDataFailed());
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData)
}