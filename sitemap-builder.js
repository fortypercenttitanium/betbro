require('@babel/register')({
	extends: './.babelrc',
});
const Sitemap = require('react-router-sitemap').default;

const router = require('./sitemap-router.jsx').default;

new Sitemap(router).build('https://www.betbro.io').save('./public/sitemap.xml');
