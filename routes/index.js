const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Welcome to the family tracker home page!');
})

router.use('/stake', require('./stake'));
router.use('/ward', require('./ward'))
router.use('/member', require('./member'))
router.use('/ancestor', require('./ancestor'))

module.exports = router;