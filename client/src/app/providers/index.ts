import compose from 'compose-function';
import { withRouter } from './withRouter';
import { withStore } from './withStore';

export const withHocs = compose(withStore, withRouter);
