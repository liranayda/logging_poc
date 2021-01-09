const appService = require('../services/appService');
const logging = require('../utils/logging');
const logger = logging.getLogger('appController');

async function getApp(req, res) {
    const fetchedApp = await appService.getApp(req.query.id);

    if (!fetchedApp) {
        logger.debug('app could not be found', {appId: req.query.id})
        return res.status(404).send();
    }

    logger.trace('app found', {appId: req.query.id})
    res.send(fetchedApp)
}

async function getAppList(req, res) {
    const result = await appService.getAppList();
    logger.trace('total of apps fetched', {appFetched: result.length})
    res.send(result);
}

async function getCampaignList(req, res) {
    const result = await appService.getCampaignList();
    logger.trace('total of campaigns fetched', {campaignFetched: result.length})
    res.send(result);
}

async function getCampaign(req, res) {
    const campaign = await appService.getCampaign(req.query.id);

    if (!campaign) {
        logger.debug('campaign could not be found', {campaignId: req.query.id})
        return res.status(404).send();
    }

    logger.debug('campaign was found', {campaignId: req.query.id})
    res.send(campaign)
}

async function saveApp(req, res) {
    try {
        if (!validateAppBody(req.body)) {
            return res.status(400).send();
        }
        await appService.saveApp(req.body);
        logger.debug(`app was saved`, req.body)
    } catch (error) {
        logger.error(`error saving app`, error)
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
        logger.debug(`campaign was saved`, req.body)
    } catch (error) {
        logger.error(`error saving campaign`, error)
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

module.exports = {getApp, getCampaign, saveApp, saveCampaign, getAppList, getCampaignList};