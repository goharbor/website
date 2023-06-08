import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  
  const value = process.env.STASH_TOKEN;

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Value of STASH_TOKEN is ${value}.`}),
  };  
};

export { handler };
