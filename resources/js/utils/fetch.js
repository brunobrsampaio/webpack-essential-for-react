export default class Fetch {

  constructor (url) {

    this.url 		= url;
    this.controller = new AbortController();
  }

  //
  request (path, options) {

    this.controller = new AbortController();

    this.options = {
      timeout : 10000,
      headers : Headers(),
      ...options,
      signal	: this.controller.signal
    };

    const url = [ this.url, path ].filter((item) => item).join('/').replace(/([^:])(\/{2,})/g, '$1/');

    const response = fetch(url, this.options);

    return Promise.race([
      response,
      new Promise((_, reject) =>

        setTimeout(() => {

          this.controller.abort();

          return reject({
            status	: 408,
            message : 'Timeout'
          });
        }, this.options.timeout)
      )
    ]);
  }

  //
  abort () {

    return this.controller.abort();
  }

  //
  getHeaders () {

    return {
      'Accept'	: 'application/json',
      'Content-Type'	: 'application/json'
    };
  }
}