import passport from 'passport';
import jwt, { ExtractJwt } from 'passport-jwt';
import { getJWTCookie } from '../utils.js';
import { UserService } from '../services/index.js';

const JWTStrategy = jwt.Strategy

const initializePassport = () => {
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([getJWTCookie]),
    secretOrKey: process.env.SECRET
  }, async (payload, done) => {
    try {
      const userFound = await UserService.current(payload.email)
      if (!userFound) {
        return done(null, false)
      }

      return done(null, userFound)
    } catch (e) {
      return done(e)
    }
  }))
}

export default initializePassport;
