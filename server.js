const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const HttpStatus = require('http-status');
const { GraphQLClient } = require('graphql-request');
const spaceXClient = new GraphQLClient('https://api.spacex.land/graphql/');

const app = new Koa();
app.use(cors());

const router = new Router();

router.get('/launches', async (ctx, next) => {
  const launchesQuery = `{
    launches {
      id
      launch_success
      mission_name
      launch_date_utc
      launch_site {
        site_name
      }
      rocket {
        rocket_name
      }
      details
      links {
        video_link
      }
    }
  }`;

  await spaceXClient
    .request(launchesQuery)
    .then(data => {
      ctx.status = HttpStatus.OK;
      ctx.body = data;
    })
    .catch(() => {
      ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    });

  await next();
});

router.get('/comments/:launchId', (ctx, next) => {
  next();
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
  console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/', PORT, PORT);
});
