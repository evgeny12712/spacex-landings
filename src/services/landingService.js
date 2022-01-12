import { storageService } from './storageService.js'
import axios from 'axios';

export const landingService = {
    query,
    getById,
    getNumOfItems
}

const KEY = 'landings'

var gNumOfItems = 0;

async function query(filterBy, paging) {
    let landingsData = await _getData();
    let landingsToReturn = _createDataObject(landingsData);
    gNumOfItems = landingsToReturn.length
    if (filterBy && filterBy.isSucceed != null) {
        var { isSucceed } = filterBy
        landingsToReturn = landingsToReturn.filter(landing => landing.isSuccess === isSucceed)
        gNumOfItems = landingsToReturn.length
    }
    if (paging && gNumOfItems > paging.landingsPerPage) {
        let numOfLandings = Math.ceil(landingsToReturn.length / paging.landingsPerPage)
        let startingItem = ((paging.pageIdx - 1) * paging.landingsPerPage) + 1;
        if (paging.pageIdx > numOfLandings) {
            return;
        }
        let returnedLandings = landingsToReturn.slice(startingItem - 1, startingItem + paging.landingsPerPage - 1)
        return Promise.resolve([...returnedLandings]);
    }
    return Promise.resolve(landingsToReturn);
}

async function getById(id) {
    let landings = await query();
    const landing = landings.find(landing => landing.id === id)
    return Promise.resolve({ ...landing })
}

function getNumOfItems() {
    return gNumOfItems
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
    const neededData = data.map(landing => {
        return {
            id: landing.id,
            name: landing.name,
            date: landing.date_local,
            isSuccess: landing.success,
            tagUrl: landing.links.patch.large,
            images: landing.links.flickr.original,
            failures: landing.failures,
            wikiLink: landing.links.wikipedia,
            details: landing.details,
            video: landing.links.youtube_id
        }
    })
    return neededData;
}