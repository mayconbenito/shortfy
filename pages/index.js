import { useState } from "react";

import Head from "next/head";
import axios from "axios";

export default function Index() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);

  async function handleShortfyURL(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        process.env.NODE_ENV === "production"
          ? `https://shortfy.ml/shortify-url`
          : "http://localhost:3000/shortify-url",
        {
          url: url
        }
      );

      setShortUrl(response.data.shortURL);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("An unexpected error has occurred.");
    }
  }

  return (
    <div>
      <Head>
        <title>Shortfy</title>
        <meta
          name="description"
          content="Shortfy.ml is a url shortener to reduce long link. Use our tool to Shortfy links and share them."
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-4336856667995288",
            enable_page_level_ads: true
          });`
          }}
        />
      </Head>
      <h1>Shortfy</h1>
      <form className="form" onSubmit={handleShortfyURL}>
        <label htmlFor="link">Type the link you want to Shortfy</label>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter the link here"
        />
        <button type="submit">Shortfy Link</button>

        {!!shortUrl && (
          <span className="short-url">
            Here it's your Shortified Link: {""}
            <a href={shortUrl} target="_blank">
              {shortUrl}
            </a>
          </span>
        )}

        {!!error && <span className="error">{error}</span>}
      </form>
    </div>
  );
}
