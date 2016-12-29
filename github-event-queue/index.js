/*
 *
 */

module.exports = function (context, event) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log(JSON.stringify(context.bindings));

    if (event) {
        var gh_event = {
            event: event,
            received: new Date().toISOString()
        };

        context.bindings.outputEventHubMessage = gh_event;
        context.bindings.outputDocument = JSON.stringify(gh_event);
        res = {
            // status: 200, /* Defaults to 200 */
            body: "Thanks for the GitHub event"
        };
    }
    context.done(null, res);
};
