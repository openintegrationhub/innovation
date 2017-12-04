"use strict";
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const snazzy = require('./snazzy.js');

exports.process = processAction;

/**
 *  This method will be called from elastic.io platform providing following data
 *
 * @param msg
 * @param cfg
 */
function processAction(msg, cfg) {

  let reply = {};
  let self = this;

  // Create a session in snazzycontacts and then make a post request to update an organization in snazzycontacts
  snazzy.createSession(cfg, () => {
    if (cfg.mp_cookie) {

      let apiKey = cfg.apikey;
      let cookie = cfg.mp_cookie;
      let uri = `https://snazzycontacts.com/mp_contact/json_respond/address_company/json_update?mp_cookie=${cookie}`;
      let updatedOrganisationUri = `https://snazzycontacts.com/mp_contact/json_respond/address_company/json_detailview?mp_cookie=${cookie}`;

      let requestOptions = {
        json: msg.body,
        headers: {
          'X-API-KEY': apiKey
        }
      };

      // Make a post request to update an organization in snazzycontacts
      request.post(uri, requestOptions)
        .then((res) => {
          reply = res.content;
          emitData();
        }, (err) => {
          emitError();
        })
        .then(() => {
          request.post(updatedOrganisationUri, requestOptions)
            .then((res) => {
              let lastUpdate = res.content[0].last_update;
              console.log(`rowid: ${organization.rowid} was last updated: ${lastUpdate}`);
              return lastUpdate;
            }, (err) => {
              console.log(`ERROR: ${err}`);
            });
        });
    }
  });

  // Emit data from promise depending on the result
  function emitData() {
    let data = messages.newMessageWithBody(reply);
    self.emit('data', data);
    console.log(JSON.stringify(data, undefined, 2));
  }

  function emitError(e) {
    console.log('Oops! Error occurred');
    self.emit('error', e);
  }
}
