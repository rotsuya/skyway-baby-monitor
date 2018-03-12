# skyway-baby-monitor

Web application of baby monitoring, powered by [SkyWay](https://webrtc.ecl.ntt.com/).

## Usage

### Run locally

1. Register [SkyWay](https://webrtc.ecl.ntt.com/) and make application. If you want to use within firewalls or proxy servers, enable "TURN".
2. Copy and paste your own API key to `common.js`.
   ```js
   const APIKEY = '4ccb9eae-d3ce-43c7-8d63-4e81880e13ba';
   ```
3. Install Jekyll.
   ```bash
   $ bundle install
   ```
4. Run Jekyll
   ```bash
   $ bundle exec jekyll serve
   ```
