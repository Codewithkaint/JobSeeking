import express from 'express'
import { deleteJob, getAlljob,getmyJobs,getSinglejob,postJob, updateJob } from '../controllers/jobController.js';
const router=express.Router();
import {isAuthorized} from '../middlewares/auth.js'


router.get('/getAll',getAlljob);
router.post('/postJob',isAuthorized,postJob);
router.get('/getJob',isAuthorized,getmyJobs);
router.put('/updateJob/:id',isAuthorized,updateJob);
router.delete('/deleteJob/:id',isAuthorized,deleteJob);
router.get('/:id',isAuthorized,getSinglejob);

export default router;