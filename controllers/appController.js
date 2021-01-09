const appService = require('../services/appService');

async function getAppList(req, res) {
    const result = await appService.getAppList();
    res.send(result);
}

async function getCampaignList(req, res) {
    const result = await appService.getCampaignList();
    res.send(result);
}

async function getApp(req, res) {
    const fetchedApp = await appService.getApp(req.query.id);

    if (!fetchedApp) {
        res.status(404).send();
    }

    res.send(fetchedApp)
}

async function getAppList(req, res) {
    const result = await appService.getAppList();
    res.send(result);
}

async function getCampaign(req, res) {
    const campaign = await appService.getCampaign(req.query.id);

    if (!campaign) {
        res.status(404).send();
    }

    res.send(campaign)
}

async function saveApp(req, res) {
    try {
        if (!validateAppBody(req.body)) {
            return res.status(400).send();
        }
        await appService.saveApp(req.body);
    } catch (error) {
        console.log(`error saving app`, error)
        return res.send(500);
    }
    return res.send(200);
}

async function saveCampaign(req, res) {
    try {
        if (!validateCampaignBody(req.body)) {
            return res.status(400).send();
        }

        await appService.saveCampaign(req.body);
    } catch (error) {
        console.log(`error saving campaign`, error)
        return res.send(500);
    }

    return res.send(200);
}

function validateAppBody(app) {
    return app.id
        && app.name
        && app.category
        && app.rating && !Number.isNaN(app.rating)
        && app.minAge && Number(app.minAge)
        && app.maxAge && Number(app.maxAge)
        && ['male', 'female'].includes(app.gender);
}

function validateCampaignBody(campaign) {
    return campaign.id
        && campaign.appId
        && campaign.name
        && campaign.rating && Number(campaign.rating);
}

module.exports = { getApp, getCampaign, saveApp, saveCampaign, getAppList, getCampaignList };