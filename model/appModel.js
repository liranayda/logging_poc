const appList = require('../migration/apps.json');
const campaignList = require('../migration/campaigns.json');
let appLookup = undefined;
let campaignLookup = undefined;

function initialize() {
    appLookup = appList.reduce((res, item) => {
        res[item.id] = item;
        return res;
    }, {});

    campaignLookup = campaignList.reduce((res, item) => {
        res[item.id] = item;
        return res;
    }, {});
}

initialize();

function getAppList() {
    return appList;
}

function getCampaignList() {
    return campaignList;
}

function getApp(uuid) {
    const app = appLookup[uuid];

    if (app) {
        const mappedApp = Object.assign({}, app);
        mappedApp.campaigns = getCampaignsForApp(app.id);
        return mappedApp;
    }
}

function getCampaign(uuid) {
    const campaign = campaignLookup[uuid];
    return campaign;
}


function getCampaignsForApp(appId) {
    return campaignList.filter((campaign) => campaign.appId === appId);
}

function addApp(app) {
    if (appLookup[app.id]) {
        throw new Error('app id already exists');
    }

    appLookup[app.id] = app;
    appList.push(app);
}

function addCampaign(campaign) {
    if (!appLookup[campaign.appId]) {
        throw new Error('app for campaign does not exist');
    }

    if (campaignLookup[campaign.id]) {
        throw new Error('campaign id already exists');
    }

    campaignLookup[campaign.id] = campaign;
    campaignList.push(campaign);
}

module.exports = { getApp, getCampaign, getAppList, getCampaignList, getCampaignsForApp, addApp, addCampaign };