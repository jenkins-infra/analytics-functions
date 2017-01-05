/*
 * Implementation of webhooks processing code for project events, as described
 * in IEP-005 which can be found here:
 *      <https://github.com/jenkins-infra/iep/pull/6>
 */

module.exports = function (context, event) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (event) {
        var source = "unknown";
        var event_type = "unknown";

        if (event_type = context.req.headers['x-github-event']) {
            source = "github";
        }

        var record = {
            source   : source,
            type     : event_type,
            event    : event,
            received: new Date().toISOString()
        };

        /* enqueue into the EventHub */
        context.bindings.outputEventHubMessage = record;
        /* append to the DocumentDB */
        context.bindings.outputDocument = JSON.stringify(record);

        res = {
            // status: 200, /* Defaults to 200 */
            body: "Thanks for the event!"
        };
    }
    context.done(null, res);
};
