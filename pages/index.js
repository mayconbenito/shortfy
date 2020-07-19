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
          ? `https://shortfy.vercel.app/shortify-url`
          : "http://localhost:3000/shortify-url",
        {
          url: url,
        }
      );

      setShortUrl(response.data.shortURL);
      setError(null);
    } catch (err) {
      process.env.NODE_ENV !== "production" && console.log(err);
      if (err.response?.data?.error?.code === "InvalidURL") {
        setError("Invalid URL format");
        return;
      }

      setError("An unexpected error has occurred.");
    }
  }

  return (
    <div>
      <h1>Shortfy</h1>
      <form className="form" onSubmit={handleShortfyURL}>
        <label htmlFor="link">Type the link you want to Shortify</label>
        <input
          id="link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter the link here"
        />
        <button type="submit">Shortify Link</button>

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
