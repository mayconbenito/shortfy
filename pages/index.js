import { useState } from "react";

import axios from "axios";

 function Index({ domain }) {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);

  async function handleShortfyURL(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://${domain}/shortify-url`,
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

Index.getInitialProps = async ({ req, res }) => {
  const host = req.headers.host;

  return { domain: host };
}

export default Index;