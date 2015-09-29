var context = require.context('./test', true, /_spec\.js$/);
context.keys().forEach(context);
