import express from 'express'
import { employerGetAll, jobSeekerDelete, jobSeekerGetAll,postApplication } from "../controllers/applicationController.js";
import {isAuthorized} from '../middlewares/auth.js'




const router=express.Router();
router.get("/employ",isAuthorized,employerGetAll);
router.get("/jobs",isAuthorized,jobSeekerGetAll);
router.post("/postJob",isAuthorized,postApplication);
router.delete("/delete/:id",isAuthorized,jobSeekerDelete);






export default router;