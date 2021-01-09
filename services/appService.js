const appModel = require('../model/appModel');

function getAppList() {
    return appModel.getAppList();
}

function getCampaignList() {
    return appModel.getCampaignList();
}

function getApp(id) {
    return appModel.getApp(id);
}

async function getCampaign(id) {
    return await appModel.getCampaign(id);
}

async function saveApp(data) {
    await appModel.addApp(data);
}

async function saveCampaign(data) {
    await appModel.addCampaign(data);
}

module.exports = {getApp, getCampaign, saveApp, saveCampaign, getAppList, getCampaignList};