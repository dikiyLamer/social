import { Strategy, ExtractJwt, StrategyOptionsWithoutRequest } from 'passport-jwt';
import { UsersService } from '../services/Users.service';

const check = (passport: any) => {
  const opts: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
  };

  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      const { payload: user } = await UsersService.getUserByEmail(jwt_payload.email);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};

export default check;
