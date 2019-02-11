import * as cassava from "cassava";

const router = new cassava.Router();

// A simple route that only handles GET on /helloWorld
router.route("/helloWorld")
    .method("GET")
    .handler(async evt => {
        return {
            body: "Hi there!"
        };
    });

// A fancier route with a path parameter `name`.
// match egs: `/hello/jeff` or `/Hello/Jeffery`
router.route("/hello/{name}")
    .method("GET")
    .handler(async evt => {
        return {
            body: `Hello ${evt.pathParameters["name"]}!`
        };
    });

router.route("/hello")
    .method("POST")
    .handler(async evt => {
        return {
            body: `Hello ${evt.pathParameters["name"]}. I'll be sure to save this data for you. Not!`
        };
    });

// Install the router as the handler for this lambda.
export const handler = router.getLambdaHandler();