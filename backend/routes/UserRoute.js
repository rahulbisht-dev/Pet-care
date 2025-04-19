import express from "express";
import { cancelAppointment, getAllAppointmentsByUserId, getAllProducts, getUserData, loginUser, logOut, updateUser, userSignUp } from "../controllers/UserController.js";
import { validateUser } from "../middlewares/validator.js";
import Upload from "../middlewares/multer.js";
import passport from "passport";
import generateToken from "../utils/tokenGenerator.js";
const router = express.Router();


router.route("/signup").post(userSignUp);
router.route("/login").post(loginUser);
router.route("/getappointments").get(validateUser , getAllAppointmentsByUserId);
router.route("/").get(validateUser , getUserData);
router.route("/getallproducts").get(getAllProducts);
router.route("/logout").get(logOut)
router.route("/updateuser").post(validateUser , Upload.single("image") , updateUser);
router.route("/cancelappointment/:appointmentId").get(validateUser , cancelAppointment);



router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  
  router.route("/google/callback").get(
    passport.authenticate("google", {
      failureRedirect: process.env.FRONTEND_URL, 
      session: false, 
    }),
    async (req, res, next) => {
      try {
        const user = req.user;
  
        if (!user) {
          return res.redirect(process.env.FRONTEND_URL);
        }
  
 
        const token = generateToken(user);
  

        res.cookie("userToken", token, {
          httpOnly: true,
          secure: true,
          sameSite:"none",
          maxAge: 24 * 60 * 60 * 1000, 
        });

        res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);


  
      } catch (error) {
        next(error); 
      }
    }
  );
  


export default router;