# skyway-baby-monitor

Web application of baby monitoring, powered by [SkyWay](https://webrtc.ecl.ntt.com/).

## Usage

1. Register [SkyWay](https://webrtc.ecl.ntt.com/) and make application. If you want to use within firewalls or proxy servers, please enable "TURN".
2. Copy and paste your own API key to `common.js`.
   ```js
   const APIKEY = 'YOUR_API_KEY';
   ```
3. Paste your Google Analytics Tracking ID to `_config.yml`. (optional)
   ```
   google-analytics-tracking-id: YOUR_TRACKING_ID
   ```
4. Install Jekyll.
   ```bash
   $ bundle install
   ```
5. Run Jekyll.
   ```bash
   $ bundle exec jekyll serve
   ```

## Demo

https://skyway-baby-monitor.otsuya.co/
