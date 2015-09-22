var context = require.context('./spec', true, /_test\.js$/);
context.keys().forEach(context);
