const shortid = require("shortid");
const Redirect = require("../schemas/Redirect");

function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i');

  return !!pattern.test(str);
}

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { url } = req.body;

    if (!isURL(url)) {
      return res.status(400).json({
        error: {
          code: "InvalidURL",
          message: "Invalid URL on request body"
        }
      });
    }

    const URLCode = shortid.generate();

    const shortify = await Redirect.create({
      url: `http://${url}`,
      code: URLCode
    });

    const shortURL =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.production_domain}/go/${shortify.code}`
        : `http://localhost:3000/go/${shortify.code}`;

    return res.json({ code: shortify.code, url: shortify.url, shortURL });
  }
};
