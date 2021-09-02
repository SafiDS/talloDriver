import * as axios from 'axios';
import { MAIN_MENU,MAINMENU_SUCCESS,MAINMENU_SUCCESS_API_ERRORED } from '../actions/types';
import { takeLatest, call, put } from 'redux-saga/effects';



/** function that returns an axios call */


async function getmenuData() {

    let Config = ConfigService.SplashSetting;
    let url = Config.mainMenu;
    let schemaName = ConfigService.MainschemaName.MainCMSschemaName; //ConfigService.schemaName.schemaName;
    let application_Access_key = ConfigService.MainschemaName.Application_Access_Key;
  
  
    let result = await axios.get(url,
      {
        headers: {
          'Access-Control-Allow-Origin': "*",
          'X-Application-Access-Key': application_Access_key,
          'schemaName': schemaName,
          'Content-Type': 'application/json',
        }
      }
    )
    return await result;
  }
  
  






/** saga worker that is responsible for the side effects */
function* mainMenusaga(action) {
    try {

        const result_main = yield call(getmenuData);
        let uniqueProject = '', project_Name = ''

        if (result_main.status == '200') {
          uniqueProject = result_main.data.filter((val, id, array) => {
            if (id == 0) {
              project_Name = val.projectSchemaName
            }
            return (val.projectSchemaName == project_Name && id != 0);
          });
          AsyncStorage.setItem('main', JSON.stringify(uniqueProject[0].projectSchemaName));

          const { HomepageNews, Project_Themes } = yield all({
            HomepageNews: call(getNews,uniqueProject[0].projectSchemaName),
            Project_Themes: call(splashScreenService)
          })
          yield put({
            type: MAINMENU_SUCCESS,
            main: result_main.data,
            HomepageName: uniqueProject,
            menulist: Project_Themes.data.menuList.sort((a, b) => (a.id > b.id) ? 1 : -1),
            themes: Project_Themes.data.splashScreenList[0],
            HomepageNews: HomepageNews.data,
          });
        }
      } catch (e) {
        yield put({ type: MAINMENU_SUCCESS_API_ERRORED, main: e });
      }
    }

    function* ExtractAudioFun(Request) {
      console.log(Request)
    }
    

/**
 * saga watcher that is triggered when dispatching action of type
 * 'LOGIN_WATCHER'
 */
export function* loginWatcherSaga() {
    yield takeLatest(MAIN_MENU, mainMenusaga);
    yield takeLatest(ExtractAudio, ExtractAudioFun);
  }