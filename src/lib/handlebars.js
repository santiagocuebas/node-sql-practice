
import { format } from 'timeago.js';

const helpers = {};

helpers.timeago = timestamp => format(timestamp);

export default helpers;
