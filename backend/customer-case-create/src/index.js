const functions = require("@google-cloud/functions-framework");
const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

/**
 * Checks if jsonBody contains all required fields for a customer case
 * @param {object} jsonBody
 * @returns
 */
const hasRequiredFields = (jsonBody) => {
  if (
    typeof jsonBody.email !== "string" ||
    typeof jsonBody.message !== "string"
  ) {
    return false;
  }
  return true;
};

module.exports = functions.http("main", async (req, res) => {
  const body = req.body;
  if (!hasRequiredFields(body)) {
    res.status(400).send("Invalid request body");
    return;
  }

  const hydratedParams = {
    supportAgent: null,
    status: "AVAILABLE",
  }
  try {
    const response = await firestore.collection("SupportCase").add({
      orderId: body.orderId,
      productId: body.productId,
      message: body.message,
      ...hydratedParams
    });
    console.log("Added document with res: ", JSON.stringify(response, null, 2));
    res.send(201);
  } catch (error) {
    console.log("Got error", JSON.stringify(error.message, null, 2));
    console.log("Statuscode", JSON.stringify(error.statusCode, null, 2));
    res.status(500).send("Error creating document.");
  }
});
