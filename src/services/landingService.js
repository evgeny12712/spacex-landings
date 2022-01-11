import { storageService } from './storageService.js'
import axios from 'axios';
export const landingService = {
    query,
    getById,
    getNumOfItems
}

const KEY = 'landings'


var gLandings = _loadLandings();
var gNumOfPages = 0;

async function query(filterBy, { pageIdx, landingsPerPage }) {
    let landingsData = await _getData();
    let landingsToReturn = _createDataObject(landingsData);
    if (filterBy && filterBy.isSucceed != null) {
        var { isSucceed } = filterBy
        landingsToReturn = landingsToReturn.filter(landing => landing.isSuccess === isSucceed)
    }
    if (pageIdx) {
        let numOfLandings = Math.ceil(landingsToReturn.length / landingsPerPage)
        let startingItem = ((pageIdx - 1) * landingsPerPage) + 1;
        if (pageIdx > numOfLandings) {
            return;
        }
        let returnedLandings = landingsToReturn.slice(startingItem - 1, startingItem + landingsPerPage - 1)
        return Promise.resolve([...returnedLandings]);
    }
    return Promise.resolve(landingsToReturn);
}

function getById(id) {
    const landing = gLandings.find(landing => landing.id === id)
    console.log('gLandings', gLandings);
    return Promise.resolve({ ...landing })
}

function getNumOfItems() {
    return gNumOfPages
}

function _loadLandings() {
    let landingsData = storageService.load(KEY)
    if (!landingsData) {
        query(null, null).then(landings => landingsData = landings)
    }
    let landingsToReturn = _createDataObject(landingsData);
    return landingsToReturn
}

async function _getData() {
    let data = storageService.load(KEY)
    if (!data) {
        console.log(`Loading ${KEY} data from api...`)
        try {
            const res = await axios.get('https://api.spacexdata.com/v4/launches')
            data = res.data
            storageService.store(KEY, data)
            return data
        }
        catch (error) {
            console.log('error', error);
        }
    }
    return data;
}

function _createDataObject(data) {
    gNumOfPages = data.length;
    const neededData = data.map(landing => {
        return {
            id: landing.id,
            name: landing.name,
            isSuccess: landing.success,
            imgUrl: landing.links.patch.large,
            failures: landing.failures,
            wikiLink: landing.links.wikipedia,
            details: landing.details,
            video: landing.links.youtube_id
        }
    })
    return neededData;
}