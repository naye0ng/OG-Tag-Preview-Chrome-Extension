import * as types from './mutation-types';
import axios from 'axios'
import cheerio from 'cheerio'
// export const setFoo = ({ commit }, payload) => {
//   commit(types.UPDATE_FOO, payload);
// }
export const setUrl = ({ commit }, payload) => {
  console.log(payload)
  commit(types.UPDATE_URL, payload);
  getMetaTags({ commit },payload)
}
// export const setMetaData = ({ commit }, payload) => {
//   commit(types.UPDATE_META_DATA, payload);
// }
// web crawling
function getMetaTags({ commit }, url){
  var chrome_data = {}
  chrome_data['url'] = url
  axios.get(url)
    .then(function (response) {
      var expTestUrl = /^(https?:\/\/)/
      var expExecUrl = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi
      const $ = cheerio.load(response.data)
      // https://github.com/joshbuchea/HEAD
      // https://css-tricks.com/essential-meta-tags-social-media/
      // Essential META Tags
      chrome_data['title'] = $("title").text() || ''
      chrome_data['og_url'] = $("meta[property='og:url']").attr("content") || ''
      chrome_data['og_title'] = $("meta[property='og:title']").attr("content") || ''
      chrome_data['og_description'] = $("meta[property='og:description']").attr("content") || ''
      var og_image = $("meta[property='og:image']").attr("content") || ''
      chrome_data['og_image' ] = expTestUrl.test(og_image) || og_image == '' ? og_image : expExecUrl.exec(chrome_data.url)[0] + og_image
      chrome_data['twitter_card'] = $("meta[name='twitter:card']").attr("content") || $("meta[property='twitter:card']").attr("content") || ''

      // Non-Essential, But Recommended
      chrome_data['og_site_name'] = $("meta[property='og:site_name']").attr("content") || ''
      chrome_data['og_image_alt'] = $("meta[property='og:image:alt']").attr("content") || ''
      chrome_data['twitter_image_alt'] = $("meta[name='twitter:image:alt']").attr("content") || $("meta[property='twitter:image:alt']").attr("content") || ''

      // Non-Essential, But Required for Analytics
      chrome_data['fb_app_id'] = $("meta[name='fb:app_id']").attr("content") || $("meta[property='fb:app_id']").attr("content") || ''
      chrome_data['twitter_site'] = $("meta[name='twitter:site']").attr("content") || $("meta[property='twitter:site']").attr("content") || ''
      chrome_data['twitter_creator'] = $("meta[name='twitter:creator']").attr("content") || $("meta[property='twitter:creator']").attr("content") || ''
      chrome_data['twitter_title'] = $("meta[name='twitter:title']").attr("content") || $("meta[property='twitter:title']").attr("content") || ''
      chrome_data['twitter_description'] = $("meta[name='twitter:description']").attr("content") || $("meta[property='twitter:description']").attr("content") || ''
      chrome_data['twitter_image'] = $("meta[name='twitter:image']").attr("content") || $("meta[property='twitter:image']").attr("content") || ''
      chrome_data['twitter_creator'] = $("meta[name='twitter:creator']").attr("content") || $("meta[property='twitter:creator']").attr("content") || ''
      var favicon = $("link[rel='icon']").attr("href") || $("link[rel='shortcut icon']").attr("href") || ''
      chrome_data['favicon'] = expTestUrl.test(favicon) || favicon == '' ? favicon : expExecUrl.exec(chrome_data.url)[0] + favicon
      commit(types.UPDATE_META_DATA, chrome_data)
      console.log(chrome_data)
    })
    .catch(function (error) {
      console.log(error);
    })
}
