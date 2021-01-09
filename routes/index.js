const router = require('express').Router();
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const appController = require('../controllers/appController.js');

router.get('/app', authenticationMiddleware, appController.getApp);
router.get('/appList', authenticationMiddleware, appController.getAppList);
router.get('/campaign', authenticationMiddleware, appController.getCampaign);
router.get('/campaignList', authenticationMiddleware, appController.getCampaignList);

router.post('/saveApp', authenticationMiddleware, appController.saveApp);
router.post('/saveCampaign', authenticationMiddleware, appController.saveCampaign);

module.exports = router;