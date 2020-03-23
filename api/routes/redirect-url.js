const Redirect = require("../schemas/Redirect");

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const { code } = req.query;

    const redirect = await Redirect.findOne({ code: code });

    if (!redirect) {
      return res.status(404).json({
        error: {
          code: "URLNotFound",
          message: "URL not found"
        }
      });
    }

    res.writeHead(301, { Location: redirect.url });

    return res.send();
  }
};
