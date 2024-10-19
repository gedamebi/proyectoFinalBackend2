import passport from 'passport'
import jwt, { ExtractJwt } from 'passport-jwt'
import { getJWTCookie } from '../utils.js'

const JWTStrategy = jwt.Strategy

const initializePassport = () => {
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([getJWTCookie]),
    secretOrKey: process.env.SECRET
  }, async (payload, done) => {
    try {
      return done(null, payload)
    } catch (e) {
      return done(e)
    }
  }))
}

export default initializePassport
