import { useState } from "react";

import Head from "next/head";
import axios from "axios";

export default function Index() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);

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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Head>
        <title>Shortfy</title>
        <script
          data-ad-client="ca-pub-6005708002042517"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
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
            Here it's your Shortified Link
            <a href={shortUrl} target="_blank">
              {shortUrl}
            </a>
          </span>
        )}
      </form>
    </div>
  );
}
