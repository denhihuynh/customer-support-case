const functions = require("@google-cloud/functions-framework");
const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

/**
 * Updates the support agent activeCaseId if there is one support agent available
 * and update status of customer case document
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Object} context Cloud Functions event metadata.
 */
exports.main = async (event, context) => {
  try {
    const snapshot = await firestore
      .collection("SupportAgent")
      .where("activeCaseId", "==", null)
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    const resource = event.value.name;
    const customerCaseId = resource.split("/SupportCase/")[1]
    const availableSupportAgentRef = snapshot.docs[0].ref;
    await availableSupportAgentRef.update({
      activeCaseId: customerCaseId,
    });

    const collectionAndDocument = resource.split("/documents/")[1]
    const affectedDoc = firestore.doc(collectionAndDocument);
    affectedDoc.update({
      status: "ASSIGNED",
    });
  } catch (error) {
    console.error("Something went wrong", error.message);
  }
};
