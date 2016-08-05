/**
 * Class for handling GET and POST on /messages
 *
 * @param {dictionary} models - Map from model names to Sequelize classes;
 * see models.js
 */
var MessagesRouter = function (models) {

  // constructor, allows object construction without "new"
  if (!(this instanceof MessagesRouter)) {
    return new MessagesRouter(models);
  }

  /**
   * Return single message specified by an ID in the request params
   *
   * @param {Request} req - Express Request object
   * @param {Response} res - Express Response object
   */
  this.getMessage = function (req, res) {
    res.set('Content-Type', 'text/plain');

    // parseInt() sanitises the input so we always get an integer or NaN here
    var messageId = parseInt(req.params.messageId);

    if (isNaN(messageId)) {
      var body = 'Bad Request: Invalid (non-numeric) message ID specified';
      res.status(400).send(body);
    }
    else {
      models.Message.findById(messageId)
      .then(
        function (message) {
          if (message) {
            res.status(200).send(message.text);
          }
          else {
            var body = 'Not Found: Message with ID ' + messageId + ' not found';
            res.status(404).send(body);
          }
        },
        function (err) {
          res.status(500).send('Server Error: Unable to query database');
          console.error(err);
        }
      );
    }
  };

  /**
   * Save POST body as new message in storage
   *
   * @param {Request} req - Express Request object
   * @param {Response} res - Express Response object
   */
  this.postMessage = function (req, res) {
    var message = req.body;

    if (message === '' || typeof message !== 'string') {
      res.set('Content-Type', 'text/plain');
      res.status(400).send('Bad Request: Empty or invalid message body');
    }
    else {
      models.Message.create({
        text: message
      })
      .then(
        function (message) {
          res.status(200).json({id: message.id});
        },
        function (err) {
          res.set('Content-Type', 'text/plain');
          res.status(500).send('Server Error: Unable to save message');
          console.error(err);
        }
      );
    }
  };
};

module.exports = MessagesRouter;
