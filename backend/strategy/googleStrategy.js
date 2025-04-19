import passport from "passport";
import "dotenv/config"
import {Strategy as googleStrategy} from "passport-google-oauth20";
import User from "../modules/User.js";



passport.use(new googleStrategy({
    clientID:process.env.CLIENT || "",
    clientSecret:process.env.CLIENT_SECRET || "",
    callbackURL:"https://petcare-l7rt.onrender.com/user/google/callback" ,
    passReqToCallback:true,
},

async(req , accessToken , refreshToken ,  profile , done) => {

    const {emails , displayName , photos} = profile;

    try{
        let user = await User.findOne({email:emails?.[0]?.value});

        if(user){
            if(!user.image && photos?.[0]?.value){
                user.image = photos?.[0]?.value
                await user.save();
            }

            console.log(user);

            return done(null , user);
        }

        user = await User.create({
            firstname:displayName,
            lastName:profile?.name?.familyName || "Unknown",
            email:emails?.[0].value,
            image:photos?.[0].value
        })

        done(null , user);
    }
    catch(error){
        done(error);
    }

}));


export default passport;
